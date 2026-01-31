import React from "react";
import { Check, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/hooks/useFollow";

interface Props {
  userId: string;
  username?: string;
  className?: string;
}

const FollowButton = ({ userId, username = "", className = "" }: Props) => {
  const { user: authUser } = useAuth();
  const currentUserId = authUser?.id ?? "u1";
  const { isFollowing, toggleFollow } = useFollow();

  if (userId === currentUserId) return null;

  const following = isFollowing(userId);

  return (
    <button
      onClick={() => toggleFollow(userId)}
      className={"ml-2 rounded-full px-4 py-1.5 text-sm font-semibold flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-[1.03] shadow-sm " + className}
      aria-pressed={following}
      title={following ? `Following ${username}` : `Follow ${username}`}
      style={following ? { background: '#f3f4f6', color: '#065f46', border: '1px solid rgba(15,23,42,0.06)' } : { background: '#14b8a6', color: '#ffffff' }}
    >
      {following ? (
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
  );
};

export default FollowButton;
