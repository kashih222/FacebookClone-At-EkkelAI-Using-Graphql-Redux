export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    surname: String!
    email: String!
    dob: String!
    gender: String!
    createdAt: String!
  }

  input SignupInput {
    firstName: String!
    surname: String!
    email: String!
    password: String!
    day: Int!
    month: String!
    year: Int!
    gender: String!
  }

  type Query {
    greet: String
  }

  type Mutation {
    signup(input: SignupInput!): User!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
    createPost(input: CreatePostInput!): Post!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
    posts: [Post!]!
    myPosts: [Post!]!
  }

  type Post {
    id: ID!
    content: String!
    imageUrl: String
    imageUrls: [String]
    author: User!
    createdAt: String!
  }

  input CreatePostInput {
    content: String!
    imageUrl: String
    imageUrls: [String]
  }
`;

