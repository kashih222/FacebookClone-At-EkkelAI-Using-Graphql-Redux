import { User } from "../models/User";
import { Post } from "../models/Post";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function monthToIndex(m: string): number {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const i = months.indexOf(m);
  if (i === -1) throw new Error("Invalid month");
  return i;
}

export const resolvers = {
  Query: {
    // logedin User Info
    me: async (_: unknown, __: unknown, ctx: any) => {
      try {
        const token = ctx.req?.cookies?.token;
        if (!token) return null;
        const secret = process.env.JWT_SECRET || "devsecret";
        const payload = jwt.verify(token, secret) as { uid: string };
        const user = await User.findById(payload.uid);
        if (!user) return null;
        return {
          id: user._id.toString(),
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          dob: user.dob.toISOString(),
          gender: user.gender,
          createdAt: user.createdAt.toISOString(),
        };
      } catch {
        return null;
      }
    },

    // Fetch all posts
    posts: async () => {
      const posts = await Post.find().sort({ createdAt: -1 }).populate("author");
      return posts.map((post: any) => ({
        id: post._id.toString(),
        content: post.content,
        imageUrl: post.imageUrl,
        imageUrls: post.imageUrls || [],
        author: {
          id: post.author._id.toString(),
          firstName: post.author.firstName,
          surname: post.author.surname,
          email: post.author.email,
          dob: post.author.dob.toISOString(),
          gender: post.author.gender,
          createdAt: post.author.createdAt.toISOString(),
        },
        createdAt: post.createdAt.toISOString(),
      }));
    },

    // Fetch my posts
    myPosts: async (_: unknown, __: unknown, ctx: any) => {
      const token = ctx.req?.cookies?.token;
      if (!token) {
        throw new Error("Not authenticated");
      }
      const secret = process.env.JWT_SECRET || "devsecret";
      const payload = jwt.verify(token, secret) as { uid: string };
      const authorId = payload.uid;

      const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate("author");
      return posts.map((post: any) => ({
        id: post._id.toString(),
        content: post.content,
        imageUrl: post.imageUrl,
        imageUrls: post.imageUrls || [],
        author: {
          id: post.author._id.toString(),
          firstName: post.author.firstName,
          surname: post.author.surname,
          email: post.author.email,
          dob: post.author.dob.toISOString(),
          gender: post.author.gender,
          createdAt: post.author.createdAt.toISOString(),
        },
        createdAt: post.createdAt.toISOString(),
      }));
    },
  },




  Mutation: {
    // SignUp USer
    signup: async (_: unknown, args: { input: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
      day: number;
      month: string;
      year: number;
      gender: string;
    }}) => {
      const { firstName, surname, email, password, day, month, year, gender } = args.input;
      const existing = await User.findOne({ email }).lean();
      if (existing) {
        throw new Error("Email already in use");
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const dob = new Date(year, monthToIndex(month), day);
      const created = await User.create({
        firstName,
        surname,
        email,
        passwordHash,
        dob,
        gender,
      });
      return {
        id: created._id.toString(),
        firstName: created.firstName,
        surname: created.surname,
        email: created.email,
        dob: created.dob.toISOString(),
        gender: created.gender,
        createdAt: created.createdAt.toISOString(),
      };
    },

    //Login User
    login: async (_: unknown, args: { email: string; password: string }, ctx: any) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        throw new Error("Invalid credentials");
      }
      const secret = process.env.JWT_SECRET || "devsecret";
      const token = jwt.sign({ uid: user._id.toString() }, secret, { expiresIn: "7d" });
      if (ctx.res) {
        ctx.res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        });
      }
      return {
        token,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          dob: user.dob.toISOString(),
          gender: user.gender,
          createdAt: user.createdAt.toISOString(),
        },
      };
    },
    // LogOut USer
    logout: async (_: unknown, __: unknown, ctx: any) => {
      if (ctx.res) {
        ctx.res.clearCookie("token", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
        });
      }
      return true;
    },
    
    // Create post 
    createPost: async (_: unknown, args: { input: { content: string; imageUrl?: string; imageUrls?: string[] } }, ctx: any) => {
      const token = ctx.req?.cookies?.token;
      if (!token) {
        throw new Error("Not authenticated");
      }
      const secret = process.env.JWT_SECRET || "devsecret";
      const payload = jwt.verify(token, secret) as { uid: string };
      const authorId = payload.uid;
      const created = await Post.create({
        content: args.input.content,
        imageUrl: args.input.imageUrl || null,
        imageUrls: args.input.imageUrls || [],
        author: authorId,
      });
      const user = await User.findById(authorId);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        id: created._id.toString(),
        content: created.content,
        imageUrl: created.imageUrl || null,
        imageUrls: created.imageUrls || [],
        author: {
          id: user._id.toString(),
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          dob: user.dob.toISOString(),
          gender: user.gender,
          createdAt: user.createdAt.toISOString(),
        },
        createdAt: created.createdAt.toISOString(),
      };
    },
  },
};
