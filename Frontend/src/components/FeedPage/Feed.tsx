import { useEffect, useState } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import { GET_ALL_POSTS_QUERY } from "../../GraphqlOprations/queries";
import {
  REACT_POST_MUTATION,
  ADD_COMMENT_MUTATION,
} from "../../GraphqlOprations/mutations";

interface FeedProps {
  refreshTrigger?: number;
}

interface GPost {
  id: string;
  content: string;
  imageUrl?: string | null;
  imageUrls?: string[];
  author: { id: string; firstName: string; surname: string; email: string };
  createdAt: string;
  comments: {
    id: string;
    content: string;
    createdAt: string;
    author: { id: string; firstName: string; surname: string; email: string };
  }[];
  reactions: {
    type: string;
    createdAt: string;
    user: { id: string };
  }[];
}

interface UIPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    time: string;
    verified: boolean;
  };
  content: string;
  image: string | null;
  likes: number;
  comments: {
    id: string;
    authorName: string;
    text: string;
    createdAt: string;
  }[];
  shares: number;
  liked: boolean;
}

const Feed = ({ refreshTrigger = 0 }: FeedProps) => {
  const [allPosts, setAllPosts] = useState<UIPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format time ago
  const formatTimeAgo = (dateString: string | null | undefined): string => {
    if (!dateString) {
      return "Recently";
    }

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.warn("Invalid date string:", dateString);
        return "Recently";
      }

      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();

      if (diffInMs < 0) {
        return "Just now";
      }

      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInSeconds < 60) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInDays < 7) return `${diffInDays}d ago`;

      const diffInWeeks = Math.floor(diffInDays / 7);
      if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) return `${diffInMonths}mo ago`;

      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears}y ago`;
    } catch (error) {
      console.error(
        "Error formatting date:",
        error,
        "Date string:",
        dateString
      );
      return "Recently";
    }
  };

  // Helper to get user initials
  const getUserInitials = (firstName: string, surname: string): string => {
    const first = firstName?.[0] || "";
    const last = surname?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const checkIfLikedByCurrentUser = (
    _reactions: { type: string; createdAt: string; user: { id: string } }[]
  ): boolean => {
    return false;
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: GET_ALL_POSTS_QUERY }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();

      if (json.errors && json.errors.length) {
        console.error("Error loading posts:", json.errors[0].message);
        setAllPosts([]);
        return;
      }

      const list = (json.data?.posts || []) as GPost[];

      const mapped: UIPost[] = list.map((p) => {
        const likeReactions =
          p.reactions?.filter((r) => r.type === "like") || [];
        const shareReactions =
          p.reactions?.filter((r) => r.type === "share") || [];

        return {
          id: p.id,
          user: {
            name: `${p.author.firstName} ${p.author.surname}`,
            avatar: getUserInitials(p.author.firstName, p.author.surname),
            time: formatTimeAgo(p.createdAt),
            verified: true,
          },
          content: p.content,
          image: p.imageUrl || (p.imageUrls?.[0] ?? null),
          likes: likeReactions.length,
          comments: (p.comments || []).map((c) => ({
            id: c.id,
            authorName: `${c.author.firstName} ${c.author.surname}`,
            text: c.content,
            createdAt: formatTimeAgo(c.createdAt),
          })),
          shares: shareReactions.length,
          liked: checkIfLikedByCurrentUser(p.reactions),
        };
      });

      // Sort posts by creation date (newest first)
      mapped.sort((a, b) => {
        const postA = list.find((p) => p.id === a.id);
        const postB = list.find((p) => p.id === b.id);

        if (!postA || !postB) return 0;

        const dateA = new Date(postA.createdAt).getTime();
        const dateB = new Date(postB.createdAt).getTime();

        return dateB - dateA; // Newest first
      });

      setAllPosts(mapped);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  const handleLike = async (postId: string) => {
    try {
      const uiPost = allPosts.find((p) => p.id === postId);
      if (!uiPost) return;

      // Optimistic update
      setAllPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
              }
            : post
        )
      );

      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: REACT_POST_MUTATION,
          variables: { input: { postId: uiPost.id, type: "like" } },
        }),
      });

      const json = await res.json();

      if (json.errors && json.errors.length) {
        console.error("Error liking post:", json.errors[0].message);
        // Revert optimistic update on error
        setAllPosts((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.liked ? post.likes + 1 : post.likes - 1,
                  liked: !post.liked,
                }
              : post
          )
        );
        return;
      }
    } catch (error) {
      console.error("Failed to like post:", error);
      // Revert optimistic update on error
      setAllPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.liked ? post.likes + 1 : post.likes - 1,
                liked: !post.liked,
              }
            : post
        )
      );
    }
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    try {
      if (!commentText.trim()) return;

      const uiPost = allPosts.find((p) => p.id === postId);
      if (!uiPost) return;

      const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: ADD_COMMENT_MUTATION,
          variables: { input: { postId: uiPost.id, content: commentText } },
        }),
      });

      const json = await res.json();

      if (json.errors && json.errors.length) {
        console.error("Error adding comment:", json.errors[0].message);
        return;
      }

      // Refresh posts after adding comment
      loadPosts();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-gray-500">📝</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No posts yet
        </h3>
        <p className="text-gray-500">Be the first to create a post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {allPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={() => handleLike(post.id)}
          onAddComment={(commentText) => handleAddComment(post.id, commentText)}
        />
      ))}
    </div>
  );
};

export default Feed;
