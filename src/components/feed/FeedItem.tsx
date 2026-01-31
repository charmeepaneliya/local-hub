import React from "react";
import { Play, Check, UserPlus } from "lucide-react";
import { User } from "@/data/mockFeed";

interface FeedItemProps {
  type: "post" | "reel";
  id: string;
  user: User;
  image?: string;
  thumbnail?: string;
  caption: string;
  isFollowing: boolean;
  hideFollow: boolean;
  onToggleFollow: (userId: string) => void;
}

const FeedItem = ({ type, id, user, image, thumbnail, caption, isFollowing, hideFollow, onToggleFollow }: FeedItemProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-foreground">{user.username}</p>
              <span className="text-xs text-muted-foreground">· 2h</span>
            </div>
            <p className="text-xs text-muted-foreground">{type === "reel" ? "Reel" : "Post"}</p>
          </div>
        </div>

        {!hideFollow && (
          <button
            onClick={() => onToggleFollow(user.id)}
            className="ml-2 rounded-full px-4 py-1.5 text-sm font-semibold flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-[1.03] shadow-sm"
            aria-pressed={isFollowing}
            title={isFollowing ? `Following ${user.username}` : `Follow ${user.username}`}
            style={
              isFollowing
                ? { background: '#f3f4f6', color: '#065f46', border: '1px solid rgba(15,23,42,0.06)' }
                : { background: '#14b8a6', color: '#ffffff' }
            }
          >
            {isFollowing ? (
              <>
                <Check className="w-4 h-4" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 opacity-90" />
                <span>Follow</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Media */}
      <div className="w-full bg-muted">
        {type === "reel" ? (
          <div className="relative">
            <img src={thumbnail} alt={caption} className="w-full aspect-[9/16] object-cover" />
            <div className="absolute inset-0 flex items-end p-4">
              <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ) : (
          <img src={image} alt={caption} className="w-full object-cover" />
        )}
      </div>

      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-sm text-foreground mb-2">{caption}</p>
      </div>
    </div>
  );
};

export default FeedItem;
