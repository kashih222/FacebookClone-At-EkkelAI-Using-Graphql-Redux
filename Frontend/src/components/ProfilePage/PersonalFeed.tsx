import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import { GET_MY_POSTS_QUERY } from "../../GraphqlOprations/queries";
import { REACT_POST_MUTATION, ADD_COMMENT_MUTATION } from "../../GraphqlOprations/mutations";
 

type PersonalFeedProps = Record<string, never>;

const PersonalFeed = forwardRef<{ refresh: () => void }, PersonalFeedProps>((_, ref) => {
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadPosts = useCallback(async () => {
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query: GET_MY_POSTS_QUERY }),
    });
    const json = await res.json();
    const list = (json.data?.myPosts || []) as GPost[];
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
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      void loadPosts();
    }, 0);
    return () => clearTimeout(t);
  }, [refreshTrigger, loadPosts]);

  

  // Expose refresh function via ref
  useImperativeHandle(ref, () => ({
    refresh: () => setRefreshTrigger(prev => prev + 1)
  }));

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
    setRefreshTrigger(prev => prev + 1);
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
    setRefreshTrigger(prev => prev + 1);
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
});

PersonalFeed.displayName = "PersonalFeed";

export default PersonalFeed;
