import { useEffect, useState } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import { GET_ALL_POSTS_QUERY } from "../../GraphqlOprations/queries";
import { REACT_POST_MUTATION, ADD_COMMENT_MUTATION } from "../../GraphqlOprations/mutations";

interface FeedProps {
  refreshTrigger?: number;
}

const Feed = ({ refreshTrigger = 0 }: FeedProps) => {
  type GPost = {
    id: string;
    content: string;
    imageUrl?: string | null;
    imageUrls?: string[];
    author: { id: string; firstName: string; surname: string; email: string };
    createdAt: string;
    comments: { id: string; content: string; createdAt: string; author: { id: string; firstName: string; surname: string; email: string } }[];
    reactions: { type: string; createdAt: string; user: { id: string } }[];
  };
  type UIPost = {
    id: string;
    user: { name: string; avatar: string; time: string; verified: boolean };
    content: string;
    image: string | null;
    likes: number;
    comments: { id: string; authorName: string; text: string; createdAt: string }[];
    shares: number;
    liked: boolean;
  };
  const [allPosts, setAllPosts] = useState<UIPost[]>([]);

  const loadPosts = async () => {
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query: GET_ALL_POSTS_QUERY }),
    });
    const json = await res.json();
    const list = (json.data?.posts || []) as GPost[];
    const mapped: UIPost[] = list.map((p) => ({
      id: p.id,
      user: {
        name: `${p.author.firstName} ${p.author.surname}`,
        avatar: `${p.author.firstName?.[0] || ""}`,
        time: p.createdAt,
        verified: true,
      },
      content: p.content,
      image: p.imageUrl || (p.imageUrls?.[0] ?? null),
      likes: p.reactions?.length ?? 0,
      comments: (p.comments || []).map(c => ({
        id: c.id,
        authorName: `${c.author.firstName} ${c.author.surname}`,
        text: c.content,
        createdAt: c.createdAt
      })),
      shares: 0,
      liked: false,
    }));
    setAllPosts(mapped);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      void loadPosts();
    }, 0);
    return () => clearTimeout(t);
  }, [refreshTrigger]);

  const handleLike = async (postId: string) => {
    const uiPost = allPosts.find(p => p.id === postId);
    if (!uiPost) return;
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: REACT_POST_MUTATION,
        variables: { input: { postId: uiPost.id, type: "like" } }
      }),
    });
    await res.json();
    await loadPosts();
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    const uiPost = allPosts.find(p => p.id === postId);
    if (!uiPost) return;
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: ADD_COMMENT_MUTATION,
        variables: { input: { postId: uiPost.id, content: commentText } }
      }),
    });
    await res.json();
    await loadPosts();
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
