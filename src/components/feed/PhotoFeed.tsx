import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, ThumbsUp, Send, Image, Check, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnquiryButtons from "@/components/enquiry/EnquiryButtons";
import FollowButton from "./FollowButton";

interface FeedPost {
  id: number;
  userId: string;
  business: {
    name: string;
    image: string;
    category: string;
    verified: boolean;
  };
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  location: string;
  isLiked: boolean;
  isSaved: boolean;
  businessType: string;
}

const allFeedPosts: FeedPost[] = [
  {
    id: 1,
    userId: "u2",
    business: {
      name: "Fashion Hub",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      category: "Clothing Store",
      verified: true,
    },
    content: "🛍️ New arrivals just dropped! Check out our winter collection with 30% OFF on all jackets and sweaters. Limited time offer! #Fashion #WinterSale",
    images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop"],
    likes: 456,
    comments: 67,
    shares: 23,
    timeAgo: "1 hour ago",
    location: "Downtown Mall",
    isLiked: false,
    isSaved: false,
    businessType: "Shops",
  },
  {
    id: 2,
    userId: "u3",
    business: {
      name: "Textile Mart",
      image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop",
      category: "Wholesale Fabrics",
      verified: true,
    },
    content: "📦 Bulk orders welcome! Premium cotton fabric at factory prices. Minimum order ₹5,000. Perfect for retailers and tailors! #Wholesale #Fabrics",
    images: ["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop"],
    likes: 189,
    comments: 34,
    shares: 56,
    timeAgo: "3 hours ago",
    location: "Textile Market",
    isLiked: true,
    isSaved: false,
    businessType: "Wholesalers",
  },
  {
    id: 3,
    userId: "u4",
    business: {
      name: "Handmade Crafts",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=100&h=100&fit=crop",
      category: "Arts & Crafts",
      verified: false,
    },
    content: "🎨 Each piece is handcrafted with love! Support local artisans and take home something truly unique. Custom orders available! #Handmade #SupportLocal",
    images: [
      "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=600&fit=crop",
    ],
    likes: 342,
    comments: 89,
    shares: 45,
    timeAgo: "5 hours ago",
    location: "Artisan Lane",
    isLiked: false,
    isSaved: true,
    businessType: "Small Business",
  },
  {
    id: 4,
    userId: "u2",
    business: {
      name: "Style Studio",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop",
      category: "Hair Salon",
      verified: true,
    },
    content: "✨ New year, new look! Check out our latest hair transformations. Book your appointment today and get 15% off! 💇‍♀️ #Salon #HairGoals",
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop"],
    likes: 567,
    comments: 78,
    shares: 34,
    timeAgo: "Yesterday",
    location: "Beauty Plaza",
    isLiked: true,
    isSaved: false,
    businessType: "Salons",
  },
  {
    id: 5,
    userId: "u4",
    business: {
      name: "Mario's Kitchen",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop",
      category: "Restaurant",
      verified: true,
    },
    content: "🍕 Fresh out of the oven! Our authentic Margherita pizza with San Marzano tomatoes. Reserve your table now! 🇮🇹 #ItalianFood #Pizza",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop"],
    likes: 789,
    comments: 123,
    shares: 67,
    timeAgo: "2 days ago",
    location: "Main Street",
    isLiked: false,
    isSaved: false,
    businessType: "Restaurants",
  },
  {
    id: 6,
    userId: "u2",
    business: {
      name: "Dr. Smith's Clinic",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop",
      category: "Healthcare",
      verified: true,
    },
    content: "🏥 Health checkup packages now available! Regular checkups can prevent serious health issues. Book your appointment today! #Healthcare #Wellness",
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop"],
    likes: 234,
    comments: 45,
    shares: 89,
    timeAgo: "3 days ago",
    location: "Medical Center",
    isLiked: false,
    isSaved: true,
    businessType: "Health",
  },
];

interface PhotoFeedProps {
  activeCategory?: string;
}

const PhotoFeed = ({ activeCategory = "All" }: PhotoFeedProps) => {
  const [posts, setPosts] = useState(allFeedPosts);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({});

  const displayPosts = posts.filter(post => 
    activeCategory === "All" || post.businessType === activeCategory
  );
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleImageNav = (postId: number, direction: 'prev' | 'next', totalImages: number) => {
    const currentIndex = activeImageIndex[postId] || 0;
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;
    setActiveImageIndex({ ...activeImageIndex, [postId]: newIndex });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Image className="w-5 h-5 text-primary" />
        {activeCategory === "All" ? "Latest Posts" : `${activeCategory} Posts`}
      </h2>
      
      {displayPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl card-shadow overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.business.image}
                  alt={post.business.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">{post.business.name}</span>
                    {post.business.verified && (
                      <span className="w-4 h-4 rounded-full gradient-primary flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.business.category}</span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FollowButton userId={post.userId} username={post.business.name} />

                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-foreground text-sm leading-relaxed">{post.content}</p>
            </div>

            {/* Location */}
            <div className="px-4 pb-3 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{post.location}</span>
            </div>

          {/* Images */}
          {post.images.length > 0 && (
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.images[activeImageIndex[post.id] || 0]}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {post.images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageNav(post.id, 'prev', post.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center hover:bg-foreground/70 transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => handleImageNav(post.id, 'next', post.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center hover:bg-foreground/70 transition-colors"
                  >
                    ›
                  </button>
                  
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {post.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          (activeImageIndex[post.id] || 0) === idx
                            ? "bg-primary-foreground"
                            : "bg-primary-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Engagement Stats */}
          <div className="px-4 py-2 flex items-center gap-4 text-sm text-muted-foreground border-b border-border">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4 fill-primary text-primary" />
              {post.likes}
            </span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-border">
            <Button
              variant="ghost"
              className={`flex-1 gap-2 ${post.isLiked ? "text-accent" : ""}`}
              onClick={() => handleLike(post.id)}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? "fill-accent" : ""}`} />
              Like
            </Button>
            <Button variant="ghost" className="flex-1 gap-2">
              <MessageCircle className="w-5 h-5" />
              Comment
            </Button>
            <Button variant="ghost" className="flex-1 gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={post.isSaved ? "text-warning" : ""}
              onClick={() => handleSave(post.id)}
            >
              <Bookmark className={`w-5 h-5 ${post.isSaved ? "fill-warning" : ""}`} />
            </Button>
          </div>

          {/* Enquiry Buttons */}
          <EnquiryButtons businessName={post.business.name} variant="full" />

          {/* Comment Input */}
          <div className="p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">You</span>
            </div>
            <Input
              placeholder="Write a comment..."
              className="flex-1 bg-secondary border-0 rounded-full text-sm h-9"
            />
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Send className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoFeed;
