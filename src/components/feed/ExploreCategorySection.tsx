import { useState } from "react";
import { Play, Image, Compass, Store, Package, Briefcase, Scissors, Heart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExploreReel {
  id: number;
  businessName: string;
  businessImage: string;
  thumbnail: string;
  views: string;
  category: string;
}

interface ExplorePost {
  id: number;
  businessName: string;
  businessImage: string;
  image: string;
  likes: number;
  category: string;
}

const exploreCategories = [
  { id: "Shops", label: "Shops", icon: Store },
  { id: "Wholesalers", label: "Wholesalers", icon: Package },
  { id: "Small Business", label: "Small Biz", icon: Briefcase },
  { id: "Salons", label: "Salons", icon: Scissors },
  { id: "Health", label: "Health", icon: Heart },
  { id: "Restaurants", label: "Food", icon: UtensilsCrossed },
];

const exploreReels: ExploreReel[] = [
  { id: 1, businessName: "Fashion Hub", businessImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop", views: "12.5K", category: "Shops" },
  { id: 2, businessName: "Tech World", businessImage: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=400&fit=crop", views: "8.2K", category: "Shops" },
  { id: 3, businessName: "Textile Mart", businessImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=400&fit=crop", views: "5.6K", category: "Wholesalers" },
  { id: 4, businessName: "Spice Traders", businessImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=400&fit=crop", views: "3.1K", category: "Wholesalers" },
  { id: 5, businessName: "Handmade Crafts", businessImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=300&h=400&fit=crop", views: "9.8K", category: "Small Business" },
  { id: 6, businessName: "Home Bakery", businessImage: "https://images.pexels.com/photos/3341067/pexels-photo-3341067.jpeg", thumbnail: "https://images.pexels.com/photos/3341067/pexels-photo-3341067.jpeg", views: "15.2K", category: "Small Business" },
  { id: 7, businessName: "Style Studio", businessImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop", views: "22.4K", category: "Salons" },
  { id: 8, businessName: "Glow Spa", businessImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=400&fit=crop", views: "18.7K", category: "Salons" },
  { id: 9, businessName: "Dr. Smith", businessImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=400&fit=crop", views: "6.3K", category: "Health" },
  { id: 10, businessName: "Zen Yoga", businessImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=400&fit=crop", views: "11.9K", category: "Health" },
  { id: 11, businessName: "Mario's Kitchen", businessImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop", views: "28.5K", category: "Restaurants" },
  { id: 12, businessName: "Sushi House", businessImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop", thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=400&fit=crop", views: "19.3K", category: "Restaurants" },
];

const explorePosts: ExplorePost[] = [
  { id: 1, businessName: "Fashion Hub", businessImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop", likes: 456, category: "Shops" },
  { id: 2, businessName: "Book Paradise", businessImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", likes: 234, category: "Shops" },
  { id: 3, businessName: "Electronics Wholesale", businessImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop", likes: 189, category: "Wholesalers" },
  { id: 4, businessName: "Footwear Hub", businessImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", likes: 312, category: "Wholesalers" },
  { id: 5, businessName: "Tailoring Studio", businessImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", likes: 278, category: "Small Business" },
  { id: 6, businessName: "Plant Paradise", businessImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop", likes: 445, category: "Small Business" },
  { id: 7, businessName: "Style Studio", businessImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop", likes: 567, category: "Salons" },
  { id: 8, businessName: "Beauty Lounge", businessImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop", likes: 389, category: "Salons" },
  { id: 9, businessName: "City Hospital", businessImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=400&fit=crop", likes: 234, category: "Health" },
  { id: 10, businessName: "Fitness Hub", businessImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", likes: 512, category: "Health" },
  { id: 11, businessName: "Café Delight", businessImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop", likes: 678, category: "Restaurants" },
  { id: 12, businessName: "BBQ Nation", businessImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop", likes: 892, category: "Restaurants" },
];

const ExploreCategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Shops");

  const filteredReels = exploreReels.filter(reel => reel.category === selectedCategory);
  const filteredPosts = explorePosts.filter(post => post.category === selectedCategory);

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Explore by Category</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-6">
        {exploreCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 flex-shrink-0 ${
                isActive ? "gradient-primary text-primary-foreground border-0" : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* Reels Grid */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
          <Play className="w-4 h-4 text-accent" />
          {selectedCategory} Reels
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={reel.thumbnail}
                alt={reel.businessName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              
              {/* Play icon */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-3 h-3 text-foreground fill-foreground" />
              </div>

              {/* Business info */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <img
                    src={reel.businessImage}
                    alt={reel.businessName}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-card"
                  />
                  <span className="text-xs font-medium text-card truncate">{reel.businessName}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-card/80">
                  <Play className="w-3 h-3" />
                  <span>{reel.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
          <Image className="w-4 h-4 text-primary" />
          {selectedCategory} Posts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.businessName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 text-card font-medium">
                  <Heart className="w-5 h-5 fill-card" />
                  <span>{post.likes}</span>
                </div>
              </div>

              {/* Business badge */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                <img
                  src={post.businessImage}
                  alt={post.businessName}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-foreground truncate max-w-[80px]">{post.businessName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategorySection;
