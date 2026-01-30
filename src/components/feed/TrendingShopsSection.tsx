import { useState, useEffect } from "react";
import { Flame, TrendingUp, Star, MapPin, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TrendingShop {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  trend: number; // percentage trending
  views: number;
  isOpen: boolean;
}

const TRENDING_SHOPS: TrendingShop[] = [
  {
    id: 1,
    name: "Fashion Hub",
    category: "Clothing",
    rating: 4.8,
    reviews: 324,
    distance: "0.3 mi",
    image: "https://images.pexels.com/photos/35558896/pexels-photo-35558896.jpeg",
    trend: 156,
    views: 2400,
    isOpen: true,
  },
  {
    id: 2,
    name: "Tech Paradise",
    category: "Electronics",
    rating: 4.6,
    reviews: 287,
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    trend: 143,
    views: 2100,
    isOpen: true,
  },
  {
    id: 3,
    name: "Beauty Glow",
    category: "Beauty & Spa",
    rating: 4.9,
    reviews: 456,
    distance: "0.5 mi",
    image: "https://images.pexels.com/photos/6977944/pexels-photo-6977944.jpeg",
    trend: 189,
    views: 3200,
    isOpen: false,
  },
  {
    id: 4,
    name: "Food Court",
    category: "Food & Beverages",
    rating: 4.5,
    reviews: 198,
    distance: "0.2 mi",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    trend: 178,
    views: 2900,
    isOpen: true,
  },
  {
    id: 5,
    name: "Fit Zone",
    category: "Fitness",
    rating: 4.7,
    reviews: 234,
    distance: "0.6 mi",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    trend: 134,
    views: 1800,
    isOpen: true,
  },
  {
    id: 6,
    name: "Home Decor",
    category: "Home & Living",
    rating: 4.4,
    reviews: 156,
    distance: "1.2 mi",
    image: "https://images.pexels.com/photos/1005223/pexels-photo-1005223.jpeg",
    trend: 121,
    views: 1500,
    isOpen: true,
  },
];

export const TrendingShopsSection = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedShop, setSelectedShop] = useState<TrendingShop | null>(null);
  const { toast } = useToast();

  const toggleFavorite = (shopId: number) => {
    setFavorites((prev) =>
      prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]
    );
    const isFavorite = favorites.includes(shopId);
    toast({
      description: isFavorite ? "❤️ Removed from favorites" : "❤️ Added to favorites",
    });
  };

  const getTrendColor = (trend: number) => {
    if (trend >= 170) return "bg-red-500/90";
    if (trend >= 140) return "bg-orange-500/90";
    return "bg-amber-500/90";
  };

  return (
    <div className="w-full py-8 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-11">
            Hot shops and services gaining popularity in your area
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_SHOPS.map((shop) => (
            <div
              key={shop.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-primary/10 hover:border-primary/30"
              onClick={() => setSelectedShop(shop)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
                />

                {/* Trending Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 ${getTrendColor(
                    shop.trend
                  )} rounded-full flex items-center gap-1`}
                >
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">+{shop.trend}%</span>
                </div>

                {/* Open/Closed Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full font-semibold text-xs text-white ${
                    shop.isOpen ? "bg-green-500/90" : "bg-slate-500/90"
                  }`}
                >
                  {shop.isOpen ? "Open" : "Closed"}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name & Category */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{shop.category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {shop.rating}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    ({shop.reviews} reviews)
                  </span>
                </div>

                {/* Distance & Views */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    {shop.distance}
                  </div>
                  <div className="px-2 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full text-xs font-semibold">
                    {shop.views.toLocaleString()} views
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "Viewing Shop",
                        description: `Opening ${shop.name}...`,
                      });
                    }}
                  >
                    View Shop
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl border-primary/20 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(shop.id);
                    }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(shop.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Button
            className="bg-gradient-to-r from-primary via-primary to-accent hover:shadow-lg rounded-xl px-8 py-2 font-bold text-white"
            onClick={() => {
              toast({
                title: "Exploring Trending Shops",
                description: "Loading all trending shops...",
              });
            }}
          >
            View All Trending Shops
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingShopsSection;
