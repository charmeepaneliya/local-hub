import { useState } from "react";
import { Zap, Clock, ShoppingBag, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FlashDeal {
  id: number;
  shopName: string;
  title: string;
  description: string;
  originalPrice?: string;
  discountPrice?: string;
  discount: number;
  image: string;
  timeLeft: string;
  category: string;
  isLimited: boolean;
}

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 1,
    shopName: "Fashion Hub",
    title: "Summer Collection",
    description: "50% off on all summer dresses",
    originalPrice: "$80",
    discountPrice: "$40",
    discount: 50,
    image: "https://images.pexels.com/photos/12048378/pexels-photo-12048378.jpeg",
    timeLeft: "2h 15m",
    category: "Fashion",
    isLimited: true,
  },
  {
    id: 2,
    shopName: "Tech Paradise",
    title: "Wireless Earbuds",
    description: "Premium quality at special price",
    originalPrice: "$120",
    discountPrice: "$59",
    discount: 51,
    image: "https://images.pexels.com/photos/35147239/pexels-photo-35147239.jpeg",
    timeLeft: "5h 45m",
    category: "Electronics",
    isLimited: true,
  },
  {
    id: 3,
    shopName: "Beauty Glow",
    title: "Skincare Bundle",
    description: "Complete skincare kit for glowing skin",
    originalPrice: "$95",
    discountPrice: "$47",
    discount: 50,
    image: "https://images.pexels.com/photos/6167445/pexels-photo-6167445.jpeg",
    timeLeft: "3h 30m",
    category: "Beauty",
    isLimited: true,
  },
  {
    id: 4,
    shopName: "Food Court",
    title: "Combo Meal Pack",
    description: "Buy 2 get 1 free on all combos",
    originalPrice: "$25",
    discountPrice: "$16.67",
    discount: 33,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    timeLeft: "1h 20m",
    category: "Food",
    isLimited: true,
  },
  {
    id: 5,
    shopName: "Fit Zone",
    title: "Gym Membership",
    description: "3 months membership at 40% off",
    originalPrice: "$150",
    discountPrice: "$90",
    discount: 40,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    timeLeft: "6h 00m",
    category: "Fitness",
    isLimited: false,
  },
  {
    id: 6,
    shopName: "Home Decor",
    title: "Wall Art Collection",
    description: "Modern wall paintings at special rates",
    originalPrice: "$55",
    discountPrice: "$27.50",
    discount: 50,
    image: "https://images.pexels.com/photos/5490200/pexels-photo-5490200.jpeg",
    timeLeft: "4h 15m",
    category: "Home",
    isLimited: true,
  },
];

export const FlashDealsSection = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleFavorite = (dealId: number) => {
    setFavorites((prev) =>
      prev.includes(dealId) ? prev.filter((id) => id !== dealId) : [...prev, dealId]
    );
    const isFavorite = favorites.includes(dealId);
    toast({
      description: isFavorite ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleBuyNow = (deal: FlashDeal) => {
    toast({
      title: "Added to Cart",
      description: `${deal.title} from ${deal.shopName} added to your cart`,
    });
  };

  return (
    <div className="w-full py-8 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 rounded-2xl">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Flash Deals
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-11">
            Limited time offers - Grab them before they're gone!
          </p>
        </div>

        {/* Horizontal Scroll for Deals */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max md:min-w-full md:grid md:grid-cols-2 lg:grid-cols-3">
            {FLASH_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="flex-shrink-0 md:flex-shrink w-full sm:w-96 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-200/50 hover:border-amber-300 group"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full font-black text-lg shadow-lg">
                    -{deal.discount}%
                  </div>

                  {/* Limited Badge */}
                  {deal.isLimited && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Limited
                    </div>
                  )}

                  {/* Time Left */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                    <div className="flex items-center gap-1 text-white font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      Ends in {deal.timeLeft}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Shop & Category */}
                  <div className="mb-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {deal.shopName} • {deal.category}
                    </p>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {deal.description}
                  </p>

                  {/* Pricing */}
                  {deal.originalPrice && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-black text-primary">
                        {deal.discountPrice}
                      </span>
                      <span className="text-sm line-through text-slate-400">
                        {deal.originalPrice}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                      onClick={() => handleBuyNow(deal)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => toggleFavorite(deal.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(deal.id)
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
        </div>

        {/* View All Deals */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10 rounded-xl px-8 py-2 font-bold"
            onClick={() => {
              toast({
                title: "Exploring All Deals",
                description: "Loading all flash deals...",
              });
            }}
          >
            View All Flash Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashDealsSection;
