import { useState } from "react";
import Post from "../CreatePostPage/PostPage/Post";
import CreatePost from "../CreatePostPage/CreatePost";

const Feed = () => {
  const posts = [
    {
      id: 1,
      user: {
        name: "آفتاب احمد",
        avatar: "آ",
        time: "5 hours ago",
        verified: true,
      },
      content: `# لکه کما نویس‌شمنت بی، کاروبار کردن سا کرون  
جس بی مایات 3 لکه کما لون.  
مشوره دی.`,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      likes: 1600,
      comments: 2000,
      shares: 21,
      liked: false,
    },
    {
      id: 2,
      user: {
        name: "سارہ خان",
        avatar: "س",
        time: "2 hours ago",
        verified: true,
      },
      content: "آج کا دن بہت خاص تھا! نیا پروجیکٹ مکمل ہو گیا۔",
      image: null,
      likes: 850,
      comments: 120,
      shares: 45,
      liked: true,
    },
    {
      id: 3,
      user: {
        name: "علی رضا",
        avatar: "ع",
        time: "1 day ago",
        verified: false,
      },
      content: "نئی ٹیکنالوجی کے بارے میں کیا خیال ہے؟",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      likes: 3200,
      comments: 580,
      shares: 210,
      liked: false,
    },
    {
      id: 4,
      user: {
        name: "فاطمہ ظہیر",
        avatar: "ف",
        time: "3 days ago",
        verified: true,
      },
      content: "پاکستان زندہ باد!",
      image: null,
      likes: 12500,
      comments: 2400,
      shares: 890,
      liked: true,
    },
  ];

  const [allPosts, setAllPosts] = useState(posts);

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
      <CreatePost />

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
