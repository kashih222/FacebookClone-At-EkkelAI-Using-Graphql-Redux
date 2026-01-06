import React, { useEffect, useRef, useState } from 'react';
import {  ThumbsUp,  MessageCircle,  Share2,  MoreHorizontal, Send, Smile, Image as ImageIcon, User, Globe} from 'lucide-react';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';

interface PostProps {
  post: {
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
    comments: { id: string; authorName: string; text: string; createdAt: string }[];
    shares: number;
    liked: boolean;
  };
  onLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const Post: React.FC<PostProps> = ({ post, onLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const [showReactions, setShowReactions] = useState(false);
  type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  const [reaction, setReaction] = useState<ReactionType | null>(null);

    const reactionsRef = useRef<HTMLDivElement>(null);

    const reactions: Array<{ type: ReactionType; icon: string; label: string; color: string }> = [
    { type: 'like', icon: '👍', label: 'Like', color: 'text-blue-600', },
    { type: 'love', icon: '❤️', label: 'Love', color: 'text-red-600',},
    { type: 'haha', icon: '😄', label: 'Haha', color: 'text-yellow-600',},
    { type: 'wow', icon: '😯', label: 'Wow', color: 'text-yellow-500', },
    { type: 'sad', icon: '😢', label: 'Sad', color: 'text-blue-500',},
    { type: 'angry', icon: '😠', label: 'Angry', color: 'text-red-700',},
  ];
    const handleReaction = (reactionType: ReactionType) => {
    setReaction(reactionType);
    onLike(post.id);
    setShowReactions(false);
  };

    const handleLikeButtonClick = () => {
    if (reaction === 'like') {
      setReaction(null);
      onLike(post.id);
    } else {
      setReaction('like');
      onLike(post.id);
    }
  };

  const handleMouseEnter = () => {
    setShowReactions(true);
  };
   const handleMouseLeave = () => {
    setTimeout(() => {
      if (reactionsRef.current && !reactionsRef.current.matches(':hover')) {
        setShowReactions(false);
      }
    }, 300);
  };

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reactionsRef.current && !reactionsRef.current.contains(event.target as Node)) {
        setShowReactions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = { id: Math.random().toString(), authorName: 'You', text: commentText, createdAt: new Date().toISOString() };
      setComments([newComment, ...comments]);
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatRelativeTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.user.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-900">{post.user.name}</h3>
               
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatRelativeTime(post.user.time)}</span>
                <span ><Globe className='w-4 h-4'/></span>
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mt-4">
          <p className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">
            {post.content}
          </p>
          
          {/* Post Image */}
          {post.image && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <div className="w-full h-96 bg-linear-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600">Post Image</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    <FaThumbsUp />
                  </div>
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    <FaHeart />

                  </div>
                </div>
                <span className="ml-2 text-sm">{formatNumber(post.likes)}</span>
              </div>
              
              <button 
                onClick={() => setShowComments(!showComments)}
                className="text-sm hover:underline"
              >
                {formatNumber(post.comments.length)} comments
              </button>
              
              <span className="text-sm">{formatNumber(post.shares)} shares</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Actions with Reactions */}
      <div className=" border-gray-200 px-4">
        <div className="flex items-center relative">
          {/* Like Button with Reactions */}
          <div 
            className="relative flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={reactionsRef}
          >
            <button
              onClick={handleLikeButtonClick}
              className={`w-full flex items-center justify-center py-3 space-x-2 ${
                reaction ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {reaction ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xl">
                    {reactions.find(r => r.type === reaction)?.icon}
                  </span>
                  <span className="font-medium">
                    {reactions.find(r => r.type === reaction)?.label}
                  </span>
                </div>
              ) : (
                <>
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">Like</span>
                </>
              )}
            </button>

            {/* Reactions Popup */}
            {showReactions && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-full shadow-lg border border-gray-200 p-1 flex items-center space-x-1 z-50">
                {reactions.map((react) => (
                  <button
                    key={react.type}
                    onClick={() => handleReaction(react.type)}
                    onMouseEnter={() => setReaction(react.type)}
                    onMouseLeave={() => {
                      if (!post.liked) setReaction(null);
                      else setReaction('like');
                    }}
                   
                    title={react.label}
                  >
                    {react.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center py-3 space-x-2 text-gray-600 hover:text-gray-800"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>
          
          {/* Share Button */}
          <button className="flex-1 flex items-center justify-center py-3 space-x-2 text-gray-600 hover:text-gray-800">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button type="submit" className="text-blue-500 hover:text-blue-600">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm">
                  {comment.authorName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl px-4 py-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{comment.authorName}</h4>
                      <span className="text-xs text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-800 mt-1">{comment.text}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <button className="hover:text-gray-700">Like</button>
                      <button className="hover:text-gray-700">Reply</button>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Comments */}
          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View more comments
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;














