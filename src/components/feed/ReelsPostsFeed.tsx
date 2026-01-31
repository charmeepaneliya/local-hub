import React, { useMemo } from "react";
import FeedItem from "./FeedItem";
import { users as mockUsers, posts as mockPosts, reels as mockReels, User, Post, Reel } from "@/data/mockFeed";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/hooks/useFollow";

type PostItem = Post & { type: "post" };
type ReelItem = Reel & { type: "reel" };
type FeedItemType = PostItem | ReelItem;

const ReelsPostsFeed = () => {
  const { user: authUser } = useAuth();
  const currentUserId = authUser?.id ?? "u1"; // fallback to mock current user id
  const { isFollowing, toggleFollow } = useFollow();

  // users map
  const usersMap = useMemo(() => {
    const m: Record<string, User> = {};
    mockUsers.forEach((u) => (m[u.id] = u));
    return m;
  }, []);

  // items combined and sorted by createdAt desc
  const items: FeedItemType[] = useMemo(() => {
    const postItems: PostItem[] = mockPosts.map((p) => ({ type: "post", ...p }));
    const reelItems: ReelItem[] = mockReels.map((r) => ({ type: "reel", ...r }));
    return [...postItems, ...reelItems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Reels & Posts Feed</h2>
        <p className="text-sm text-muted-foreground">Mock data — no backend</p>
      </div>

      <div className="space-y-6">
        {items.map((it) => {
          const u = usersMap[it.userId];
          if (!u) return null;

          const hideFollow = it.userId === currentUserId;
          const following = isFollowing(it.userId);

          // Narrow union before passing props to ensure proper typing
          if (it.type === "post") {
            return (
              <FeedItem
                key={it.id}
                type={"post"}
                id={it.id}
                user={u}
                image={it.image}
                caption={it.caption}
                isFollowing={following}
                hideFollow={hideFollow}
                onToggleFollow={toggleFollow}
              />
            );
          }

          return (
            <FeedItem
              key={it.id}
              type={"reel"}
              id={it.id}
              user={u}
              thumbnail={it.thumbnail}
              caption={it.caption}
              isFollowing={following}
              hideFollow={hideFollow}
              onToggleFollow={toggleFollow}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ReelsPostsFeed;
