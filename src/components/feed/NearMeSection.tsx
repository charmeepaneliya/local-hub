import { useState } from "react";
import { MapPin, Star, Navigation, Phone, MessageCircle, Navigation2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NearbyShop {
  id: number;
  name: string;
  category: string;
  distance: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  address: string;
  image: string;
  isOpen: boolean;
  phone?: string;
  eta?: string;
}

const NEARBY_SHOPS: NearbyShop[] = [
  {
    id: 1,
    name: "Fashion Hub",
    category: "Clothing & Accessories",
    distance: "0.3 km",
    distanceKm: 0.3,
    rating: 4.8,
    reviews: 324,
    address: "123 Main Street, Downtown",
    image: "https://images.pexels.com/photos/29699414/pexels-photo-29699414.jpeg",
    isOpen: true,
    phone: "+1 234-567-8900",
    eta: "4 mins",
  },
  {
    id: 2,
    name: "Food Court",
    category: "Food & Beverages",
    distance: "0.2 km",
    distanceKm: 0.2,
    rating: 4.5,
    reviews: 198,
    address: "456 Food Street, Market Area",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    isOpen: true,
    phone: "+1 234-567-8901",
    eta: "3 mins",
  },
  {
    id: 3,
    name: "Coffee & Bakery",
    category: "Cafe & Bakery",
    distance: "0.4 km",
    distanceKm: 0.4,
    rating: 4.7,
    reviews: 267,
    address: "789 Cafe Lane, Shopping District",
    image: "https://images.pexels.com/photos/15620674/pexels-photo-15620674.jpeg",
    isOpen: true,
    phone: "+1 234-567-8902",
    eta: "5 mins",
  },
  {
    id: 4,
    name: "Tech Repair Shop",
    category: "Electronics & Repair",
    distance: "0.5 km",
    distanceKm: 0.5,
    rating: 4.6,
    reviews: 156,
    address: "321 Tech Street, Business District",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    isOpen: false,
    phone: "+1 234-567-8903",
    eta: "7 mins",
  },
  {
    id: 5,
    name: "Beauty Salon",
    category: "Beauty & Spa",
    distance: "0.6 km",
    distanceKm: 0.6,
    rating: 4.9,
    reviews: 456,
    address: "654 Beauty Avenue, Uptown",
    image: "https://images.pexels.com/photos/4783329/pexels-photo-4783329.jpeg",
    isOpen: true,
    phone: "+1 234-567-8904",
    eta: "8 mins",
  },
  {
    id: 6,
    name: "Pharmacy Plus",
    category: "Pharmacy & Health",
    distance: "0.7 km",
    distanceKm: 0.7,
    rating: 4.4,
    reviews: 289,
    address: "987 Health Street, Central Area",
    image: "https://images.pexels.com/photos/29110700/pexels-photo-29110700.jpeg",
    isOpen: true,
    phone: "+1 234-567-8905",
    eta: "9 mins",
  },
];

export const NearMeSection = () => {
  const { toast } = useToast();

  const handleCall = (shop: NearbyShop) => {
    toast({
      title: "Calling",
      description: `Calling ${shop.name}...`,
    });
  };

  const handleDirections = (shop: NearbyShop) => {
    toast({
      title: "Opening Directions",
      description: `Navigate to ${shop.name} (${shop.distance})`,
    });
  };

  const handleChat = (shop: NearbyShop) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${shop.name}...`,
    });
  };

  const sortedShops = [...NEARBY_SHOPS].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="w-full py-8 bg-gradient-to-br from-green-50 via-transparent to-blue-50 dark:from-green-950/20 dark:via-transparent dark:to-blue-950/20 rounded-2xl">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
              <Navigation2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Near Me
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-11">
            Popular shops and services around you, sorted by distance
          </p>
        </div>

        {/* List View */}
        <div className="space-y-3">
          {sortedShops.map((shop) => (
            <div
              key={shop.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-green-100/50 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700 p-4"
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="relative flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Open/Closed */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full font-bold text-xs text-white ${
                      shop.isOpen ? "bg-green-500/90" : "bg-slate-500/90"
                    }`}
                  >
                    {shop.isOpen ? "Open" : "Closed"}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {shop.category}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {shop.distance}
                      </div>
                      <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-semibold">
                        {shop.eta}
                      </div>
                    </div>
                  </div>

                  {/* Rating & Address */}
                  <div className="mb-3 space-y-1">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-start gap-1 text-xs text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{shop.address}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold h-8 text-xs flex items-center justify-center gap-1"
                      onClick={() => handleDirections(shop)}
                    >
                      <Navigation className="w-3 h-3" />
                      Navigate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-3 rounded-lg border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30 h-8"
                      onClick={() => handleCall(shop)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-3 rounded-lg border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30 h-8"
                      onClick={() => handleChat(shop)}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Nearby Shops */}
        <div className="mt-6 text-center">
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl px-8 py-2 font-bold"
            onClick={() => {
              toast({
                title: "Showing More Shops",
                description: "Loading all nearby shops...",
              });
            }}
          >
            Show More Nearby Shops
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NearMeSection;
