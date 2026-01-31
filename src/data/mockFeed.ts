export type User = {
  id: string;
  username: string;
  avatar: string;
  isFollowed?: boolean;
};

export type Reel = {
  id: string;
  userId: string;
  caption: string;
  thumbnail: string;
  videoUrl?: string;
  createdAt: string;
};

export type Post = {
  id: string;
  userId: string;
  caption: string;
  image: string;
  createdAt: string;
};

export const currentUserId = "u1"; // Mock currently-logged-in user (used when no real auth)

export const users: User[] = [
  { id: "u1", username: "alex", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", isFollowed: false },
  { id: "u2", username: "jessica", avatar: "https://images.unsplash.com/photo-1545996124-1f3a1e82e5f6?w=200&h=200&fit=crop", isFollowed: true },
  { id: "u3", username: "michael", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&fit=crop", isFollowed: false },
  { id: "u4", username: "sara", avatar: "https://images.unsplash.com/photo-1531123414780-f9f6f0a3b9e0?w=200&h=200&fit=crop", isFollowed: false },
];

export const reels: Reel[] = [
  {
    id: "r1",
    userId: "u2",
    caption: "Quick styling tips for winter #fashion",
    thumbnail: "https://images.unsplash.com/photo-1520975911586-ccf76a0a4f71?w=800&h=1400&fit=crop",
    videoUrl: "",
    createdAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "r2",
    userId: "u3",
    caption: "Our new gadgets are here 🔥",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1400&fit=crop",
    videoUrl: "",
    createdAt: "2026-01-29T14:00:00Z",
  },
  {
    id: "r3",
    userId: "u4",
    caption: "How we make our sourdough 🍞",
    thumbnail: "https://images.pexels.com/photos/10907000/pexels-photo-10907000.jpeg?w=800&h=1400&fit=crop",
    videoUrl: "",
    createdAt: "2026-01-28T09:00:00Z",
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    userId: "u2",
    caption: "Behind the scenes of our new collection",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    createdAt: "2026-01-30T08:30:00Z",
  },
  {
    id: "p2",
    userId: "u3",
    caption: "Top 5 must-have accessories this season",
    image: "https://images.unsplash.com/photo-1513862852596-d8e6e6a5af68?w=1200&h=800&fit=crop",
    createdAt: "2026-01-29T16:45:00Z",
  },
  {
    id: "p3",
    userId: "u4",
    caption: "Freshly baked & ready for pickup!",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=1200&h=800&fit=crop",
    createdAt: "2026-01-28T12:15:00Z",
  },
];
