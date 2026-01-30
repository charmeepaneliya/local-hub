import { useState, useEffect } from "react";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RecentlyViewedShop {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  distance: string;
  viewedAt: Date;
}

const MOCK_RECENTLY_VIEWED: RecentlyViewedShop[] = [
  {
    id: 1,
    name: "Fashion Hub",
    image: "https://images.pexels.com/photos/6069081/pexels-photo-6069081.jpeg",
    category: "Clothing",
    rating: 4.8,
    distance: "0.3 mi",
    viewedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    name: "Tech Paradise",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    rating: 4.6,
    distance: "0.8 mi",
    viewedAt: new Date(Date.now() - 7200000),
  },
  {
    id: 3,
    name: "Coffee & Bakery",
    image: "https://images.pexels.com/photos/15620674/pexels-photo-15620674.jpeg",
    category: "Cafe",
    rating: 4.7,
    distance: "0.4 mi",
    viewedAt: new Date(Date.now() - 14400000),
  },
  {
    id: 4,
    name: "Beauty Glow",
    image: "https://images.pexels.com/photos/6977659/pexels-photo-6977659.jpeg",
    category: "Beauty",
    rating: 4.9,
    distance: "0.5 mi",
    viewedAt: new Date(Date.now() - 86400000),
  },
];

export const RecentlyViewedSection = () => {
  const [items, setItems] = useState<RecentlyViewedShop[]>(MOCK_RECENTLY_VIEWED);
  const { toast } = useToast();

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div className="w-full py-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/50 rounded-2xl">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Recently Viewed
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Shops you recently checked out
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Eye className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400">
              You haven't viewed any shops yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((shop) => (
              <div
                key={shop.id}
                className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {getTimeAgo(shop.viewedAt)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {shop.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {shop.category}
                  </p>

                  {/* Rating & Distance */}
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {shop.rating}
                      </span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">{shop.distance}</span>
                  </div>

                  {/* View Button */}
                  <Button
                    className="w-full h-7 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-bold flex items-center justify-center gap-1"
                    onClick={() => toast({ description: `Opening ${shop.name}...` })}
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All */}
        {items.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl px-6 font-bold"
              onClick={() => toast({ description: "Loading all recently viewed..." })}
            >
              View All Recently Viewed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedSection;
