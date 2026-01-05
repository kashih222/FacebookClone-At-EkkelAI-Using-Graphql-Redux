import { useEffect, useState } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import { GET_ALL_POSTS_QUERY } from "../../GraphqlOprations/queries";

const Feed = () => {
  type GPost = {
    id: string;
    content: string;
    imageUrl?: string | null;
    imageUrls?: string[];
    author: { id: string; firstName: string; surname: string; email: string };
    createdAt: string;
  };
  type UIPost = {
    id: number;
    user: { name: string; avatar: string; time: string; verified: boolean };
    content: string;
    image: string | null;
    likes: number;
    comments: number;
    shares: number;
    liked: boolean;
  };
  const [allPosts, setAllPosts] = useState<UIPost[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: GET_ALL_POSTS_QUERY }),
      });
      const json = await res.json();
      const list = (json.data?.posts || []) as GPost[];
      const mapped: UIPost[] = list.map((p, idx) => ({
        id: idx + 1,
        user: {
          name: `${p.author.firstName} ${p.author.surname}`,
          avatar: `${p.author.firstName?.[0] || ""}`,
          time: p.createdAt,
          verified: true,
        },
        content: p.content,
        image: p.imageUrl || (p.imageUrls?.[0] ?? null),
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      }));
      setAllPosts(mapped);
    };
    load();
  }, []);

  const handleLike = (postId: number) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: number, commentText: string) => {
    console.log(`Added comment to post ${postId}: ${commentText}`);
  };

  return (
    <div className="space-y-6">

      {allPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
};

export default Feed;
