import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Heart, Phone, MessageCircle, Share2, ExternalLink, Zap, Calendar, Image, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";
import ShopChat from "./ShopChat";
import EnhancedShopBooking, { BookingData } from "./EnhancedShopBooking";
import { BusinessPostModal, BusinessPostsList, BusinessPost } from "./BusinessPost";
import { DetailedShopInfo } from "./DetailedShopView";
import { getShopStatus, getStatusColor, getStatusIcon, formatOpeningHours } from "@/utils/shopUtils";

export interface ShopData {
  id: number;
  name: string;
  category: string;
  type: "shop" | "wholesaler" | "small-business";
  rating: number;
  reviews: number;
  distance: string;
  hours: string;
  image: string;
  isOpen: boolean;
  tags: string[];
  description: string;
  minOrder?: string;
  discount?: string;
  phone?: string;
  address?: string;
}

interface ShopCardProps {
  shop: ShopData;
  onViewDetails?: (shop: ShopData) => void;
}

const ShopCard = ({ shop, onViewDetails }: ShopCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [shopStatus, setShopStatus] = useState(getShopStatus(shop.hours));
  const [businessPosts, setBusinessPosts] = useState<BusinessPost[]>([]);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Update shop status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setShopStatus(getShopStatus(shop.hours));
    }, 60000);

    return () => clearInterval(interval);
  }, [shop.hours]);

  const getTypeStyles = () => {
    switch (shop.type) {
      case "wholesaler":
        return { bg: "bg-accent/10", text: "text-accent", label: "Wholesaler" };
      case "small-business":
        return { bg: "bg-success/10", text: "text-success", label: "Small Business" };
      default:
        return { bg: "bg-primary/10", text: "text-primary", label: "Retail Shop" };
    }
  };

  const getPlaceholderImage = () => {
    const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];
    const color = colors[shop.id % colors.length];
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='${color}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='white' font-weight='bold'%3E${shop.name.substring(0, 15)}%3C/text%3E%3C/svg%3E`;
  };

  const typeStyle = getTypeStyles();
  const statusColor = getStatusColor(shopStatus.status);
  const statusIcon = getStatusIcon(shopStatus.status);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isCurrentlyFavorite = isFavorite(shop.id);
    toggleFavorite(shop);
    toast({
      description: isCurrentlyFavorite ? "❤️ Removed from favorites" : "❤️ Added to favorites",
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: shop.name,
        text: shop.description,
      });
    } else {
      toast({
        description: "📋 Shop link copied to clipboard",
      });
    }
  };

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setShowDetailedView(true);
    onViewDetails?.(shop);
  };

  const handleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowChat(true);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shop.phone) {
      window.location.href = `tel:${shop.phone}`;
      toast({
        description: `📞 Calling ${shop.name}...`,
      });
    } else {
      toast({
        description: "📞 Phone number not available",
      });
    }
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBooking(true);
  };

  const handleBookingConfirm = (booking: BookingData) => {
    toast({
      description: `✅ Booking confirmed for ${booking.date} at ${booking.time}!`,
    });
  };

  const handlePostCreate = (postData: Omit<BusinessPost, "id" | "timestamp" | "likes" | "comments" | "shopName" | "shopImage">) => {
    const newPost: BusinessPost = {
      id: `post_${Date.now()}`,
      ...postData,
      shopName: shop.name,
      shopImage: shop.image,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      hasLiked: false,
    };
    setBusinessPosts([newPost, ...businessPosts]);
    toast({
      description: "🎉 Post published! Your business is now showcased",
    });
  };

  const handleLikePost = (postId: string) => {
    setBusinessPosts(
      businessPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post
      )
    );
  };

  return (
    <>
      {/* Shop Card */}
      <div className="group h-full">
        <div 
          onClick={handleViewDetails}
          className="relative bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-900/95 dark:to-slate-900/80 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-2xl hover:scale-105 border border-primary/10 hover:border-primary/30"
        >
          {/* Image Section with Status Overlay */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-300 to-slate-400">
            <img
              src={imageError ? getPlaceholderImage() : shop.image}
              alt={shop.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Top Right Action Buttons - Minimal */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handleFavorite}
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                title="Add to favorites"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFavorite(shop.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                title="Share"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Top Left Badges - Stacked */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {shop.discount && (
                <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
                  <Zap className="w-3 h-3" />
                  {shop.discount}
                </div>
              )}
              <div className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                {typeStyle.label}
              </div>
            </div>

            {/* Status Badge - Bottom Left */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className={`${statusColor} shadow-xl font-bold text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 backdrop-blur-md`}>
                <span className="animate-pulse text-lg">{statusIcon}</span>
                <span>{shopStatus.isOpen ? "Open Now" : "Closed"}</span>
              </div>
            </div>

            {/* Time until change - Bottom Right */}
            {shopStatus.timeUntilChange && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md z-10">
                ⏱️ {shopStatus.timeUntilChange}
              </div>
            )}
          </div>

          {/* Content Section with Better Spacing */}
          <div className="p-5 flex flex-col flex-1">
            {/* Title & Category */}
            <div className="mb-3">
              <h3 className="font-bold text-foreground text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {shop.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{shop.category}</p>
            </div>

            {/* Closing Time Info - Highlighted */}
            {shopStatus.nextStatusTime && (
              <div className="mb-3 p-2.5 bg-amber-500/15 border border-amber-500/30 rounded-lg">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {shopStatus.nextStatusTime}
                </p>
              </div>
            )}

            {/* Rating and Distance - Highlighted Cards */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/30 rounded-lg px-3 py-2 flex-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-foreground text-sm">{shop.rating}</span>
                <span className="text-muted-foreground text-xs">({shop.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/60 border border-primary/10 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-xs font-medium">{shop.distance}</span>
              </div>
            </div>

            {/* Tags - Better Display */}
            {shop.tags && shop.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {shop.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
                {shop.tags.length > 2 && (
                  <span className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full font-medium">
                    +{shop.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Min Order Info */}
            {shop.minOrder && (
              <p className="text-xs text-accent font-semibold mb-3 bg-accent/15 border border-accent/30 px-3 py-2 rounded-lg">
                💳 Min Order: {shop.minOrder}
              </p>
            )}

            {/* Action Buttons - Enhanced */}
            <div className="flex flex-col gap-3 mt-auto">
              {/* Primary View Details Button */}
              <Button
                onClick={(e) => handleViewDetails(e)}
                className="w-full h-14 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-200 text-white font-black rounded-xl text-sm group relative overflow-hidden border-0 shadow-xl"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              
              {/* Icon Buttons Row */}
              <div className="flex gap-1.5">
                <Button
                  onClick={() => setShowPostModal(true)}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-purple-300/50 hover:bg-purple-500/15 hover:border-purple-500 hover:scale-110 transition-all"
                  title="Post product"
                >
                  <Image className="w-5 h-5 text-purple-600" />
                </Button>
                <Button
                  onClick={handleBooking}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-blue-300/50 hover:bg-blue-500/15 hover:border-blue-500 hover:scale-110 transition-all"
                  title="Book"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                </Button>
                <Button
                  onClick={handleChat}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-xl border-primary/30 hover:bg-primary/15 hover:border-primary hover:scale-110 transition-all"
                  title="Chat"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                </Button>
                <Button
                  onClick={handleCall}
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-xl hover:bg-green-500/15 hover:scale-110 transition-all"
                  title="Call"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Chat Modal */}
      <ShopChat shop={shop} open={showChat} onClose={() => setShowChat(false)} />

      {/* Shop Booking Modal */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Book Service at {shop.name}
            </DialogTitle>
            <DialogDescription>
              Complete your booking in easy steps. Secure your service slot now.
            </DialogDescription>
          </DialogHeader>
          <EnhancedShopBooking
            shopId={shop.id}
            shopName={shop.name}
            onBooking={(data: BookingData) => {
              toast({
                title: "Booking Confirmed! ✓",
                description: `Your booking at ${shop.name} is confirmed. Check your email for details.`,
              });
              setShowBooking(false);
              handleBookingConfirm();
            }}
            onCancel={() => setShowBooking(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Business Post Modal */}
      <BusinessPostModal
        open={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPost={handlePostCreate}
        shopName={shop.name}
        shopImage={shop.image}
      />

      {/* View Posts Modal */}
      <Dialog open={showPosts} onOpenChange={setShowPosts}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{shop.name}'s Posts</DialogTitle>
            <DialogDescription>Latest products, offers & videos</DialogDescription>
          </DialogHeader>
          {businessPosts.length > 0 ? (
            <BusinessPostsList posts={businessPosts} onLike={handleLikePost} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No posts yet</p>
              <Button onClick={() => {
                setShowPosts(false);
                setShowPostModal(true);
              }} className="bg-primary hover:bg-primary/90">
                Create First Post
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Detailed Shop View Modal */}
      <Dialog open={showDetailedView} onOpenChange={setShowDetailedView}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
          <DialogHeader className="border-b border-primary/20">
            <DialogTitle className="text-2xl font-bold">{shop.name}</DialogTitle>
            <DialogDescription>{shop.category}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <DetailedShopInfo shop={shop} onClose={() => setShowDetailedView(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShopCard;
