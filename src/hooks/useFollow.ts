import { useEffect, useState } from "react";
import { users as mockUsers } from "@/data/mockFeed";

const LOCAL_KEY = "lc_followedUsers";

export const useFollow = () => {
  const [followMap, setFollowMap] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }

    const initial: Record<string, boolean> = {};
    mockUsers.forEach((u) => {
      initial[u.id] = !!u.isFollowed;
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(followMap));
  }, [followMap]);

  const toggleFollow = (userId: string) => {
    setFollowMap((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const isFollowing = (userId: string) => !!followMap[userId];

  return { followMap, isFollowing, toggleFollow };
};
