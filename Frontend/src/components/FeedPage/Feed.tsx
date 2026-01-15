import { useEffect, useState, useCallback, useRef } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import { GET_ALL_POSTS_QUERY } from "../../GraphqlOprations/queries";
import { REACT_POST_MUTATION } from "../../GraphqlOprations/mutations";
import { GET_VIEW_URLS_MUTATION } from "../../GraphqlOprations/queries";
import { useAppSelector } from "../../Redux Toolkit/hooks";

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
  images: string[];
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
  const [visibleCount, setVisibleCount] = useState(10);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const currentUser = useAppSelector((state) => state.user.user);
  const isAuthenticated = !!currentUser;

  const sanitizeUrl = (url?: string | null): string | null => {
    if (!url || typeof url !== "string") return null;
    const trimmed = url.trim();
    const withoutTicks = trimmed.replace(/^`|`$/g, "");
    const withoutQuotes = withoutTicks.replace(/^"|"$|^'|'$/g, "");
    return withoutQuotes;
  };

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

  const getUserInitials = (firstName: string, surname: string): string => {
    const first = firstName?.[0] || "";
    const last = surname?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const loadPosts = useCallback(async () => {
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

        const primary = sanitizeUrl(p.imageUrl);
        const gallery = (p.imageUrls || [])
          .map((u) => sanitizeUrl(u))
          .filter((u): u is string => !!u);
        const images = [
          ...(primary ? [primary] : []),
          ...gallery.filter((u) => u !== primary),
        ];

        return {
          id: p.id,
          user: {
            name: `${p.author.firstName} ${p.author.surname}`,
            avatar: getUserInitials(p.author.firstName, p.author.surname),
            time: formatTimeAgo(p.createdAt),
            verified: true,
          },
          content: p.content,
          images,
          likes: likeReactions.length,
          comments: (p.comments || []).map((c) => ({
            id: c.id,
            authorName: `${c.author.firstName} ${c.author.surname}`,
            text: (c.content || "").trim(),
            createdAt: formatTimeAgo(c.createdAt),
          })),
          shares: shareReactions.length,
          liked: currentUser
            ? p.reactions?.some(
                (r) => r.type === "like" && r.user && r.user.id === currentUser.id
              ) || false
            : false,
        };
      });

      mapped.sort((a, b) => {
        const postA = list.find((p) => p.id === a.id);
        const postB = list.find((p) => p.id === b.id);

        if (!postA || !postB) return 0;

        const dateA = new Date(postA.createdAt).getTime();
        const dateB = new Date(postB.createdAt).getTime();

        return dateB - dateA;
      });

      // Decide whether to sign URLs based on auth state.
      // If the user is not logged in, we return the original URLs (public images keep working)
      // and skip calling the signing endpoint (which likely requires auth).
      const userAuthenticated = !!currentUser;
      if (!userAuthenticated) {
        setAllPosts(mapped);
        return;
      }

      const allUrls = Array.from(
        new Set(
          mapped.flatMap((p) => p.images).filter((u) => typeof u === "string")
        )
      );
      let urlMap: Record<string, string> = {};
      if (allUrls.length > 0) {
        const signRes = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            query: GET_VIEW_URLS_MUTATION,
            variables: { urls: allUrls },
          }),
        });
        const signJson = await signRes.json();
        if (!signJson.errors && signJson.data?.getViewUrls) {
          const signed: string[] = signJson.data.getViewUrls;
          urlMap = Object.fromEntries(allUrls.map((u, i) => [u, signed[i]]));
        }
      }
      const replaced = mapped.map((p) => ({
        ...p,
        images: p.images.map((u) => urlMap[u] || u),
      }));
      setAllPosts(replaced);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    setVisibleCount(10);
    loadPosts();
  }, [refreshTrigger, loadPosts]);

 
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setVisibleCount((prev) => prev + 5);
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLike = async (postId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    try {
      const uiPost = allPosts.find((p) => p.id === postId);
      if (!uiPost) return;

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


  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

 

  return (
    <div className="space-y-6">
      {allPosts.slice(0, visibleCount).map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={() => handleLike(post.id)}
          isAuthenticated={isAuthenticated}
          onAuthRequired={() => setShowAuthModal(true)}
        />
      ))}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-1" />

      {/* Auth required modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Sign in to continue
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You need to be signed in to like posts or add comments.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <a
                href="/login"
                className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
