import Header from "@/components/layout/Header";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar";
import CategoryFilter from "@/components/home/CategoryFilter";
import PhotoFeed from "@/components/feed/PhotoFeed";
import ExploreCategorySection from "@/components/feed/ExploreCategorySection";
import ReelsSection from "@/components/feed/ReelsSection";
import ShopCard, { ShopData } from "@/components/business/ShopCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, TrendingUp, Search } from "lucide-react";

// Sample shops data for search
const SAMPLE_SHOPS: ShopData[] = [
  {
    id: 1,
    name: "Fashion Hub",
    category: "Clothing",
    type: "retail",
    rating: 4.8,
    reviews: 234,
    distance: "0.5 mi",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop",
    tags: ["Clothing", "Fashion", "Trendy"],
    description: "Latest fashion trends and styles",
    discount: "30% OFF",
    isOpen: true,
    openTime: "9:00 AM",
    closeTime: "9:00 PM",
  },
  {
    id: 2,
    name: "Textile Mart",
    category: "Wholesale",
    type: "wholesaler",
    rating: 4.7,
    reviews: 342,
    distance: "1.2 mi",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop",
    tags: ["Fabrics", "Wholesale", "Bulk"],
    description: "Premium fabrics at wholesale prices",
    minOrder: "₹5,000",
    discount: "Bulk Deals",
    isOpen: true,
    openTime: "8:00 AM",
    closeTime: "6:00 PM",
  },
  {
    id: 3,
    name: "Café Delight",
    category: "Restaurant",
    type: "retail",
    rating: 4.6,
    reviews: 156,
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=600&fit=crop",
    tags: ["Coffee", "Food", "Café"],
    description: "Cozy café with great coffee",
    discount: "20% OFF",
    isOpen: true,
    openTime: "7:00 AM",
    closeTime: "8:00 PM",
  },
  {
    id: 4,
    name: "Style Studio",
    category: "Salon",
    type: "retail",
    rating: 4.9,
    reviews: 423,
    distance: "0.3 mi",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop",
    tags: ["Salon", "Hair", "Beauty"],
    description: "Premium salon and beauty services",
    discount: "15% OFF",
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "7:00 PM",
  },
  {
    id: 5,
    name: "Gadget World",
    category: "Electronics",
    type: "retail",
    rating: 4.5,
    reviews: 289,
    distance: "1.5 mi",
    image: "https://images.pexels.com/photos/6834358/pexels-photo-6834358.jpeg",
    tags: ["Electronics", "Gadgets", "Tech"],
    description: "Latest tech gadgets and phones",
    discount: "25% OFF",
    isOpen: true,
    openTime: "10:00 AM",
    closeTime: "8:00 PM",
  },
  {
    id: 6,
    name: "Fresh Market",
    category: "Groceries",
    type: "retail",
    rating: 4.4,
    reviews: 178,
    distance: "0.7 mi",
    image: "https://images.unsplash.com/photo-1488459716781-6f03ee1d84d8?w=600&h=600&fit=crop",
    tags: ["Groceries", "Fresh", "Organic"],
    description: "Fresh vegetables and organic produce",
    discount: "10% OFF",
    isOpen: true,
    openTime: "6:00 AM",
    closeTime: "9:00 PM",
  },
];

interface SearchFilters {
  category: string;
  rating: number;
  distance: number;
  priceRange: string;
  openNow: boolean;
}

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    rating: 0,
    distance: 100,
    priceRange: "all",
    openNow: false,
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();

  // Initialize search from URL params
  useEffect(() => {
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const rating = searchParams.get("rating");
    const distance = searchParams.get("distance");

    if (query) {
      setSearchQuery(query);
      setIsSearching(true);
    }

    if (category || rating || distance) {
      setFilters({
        category: category || "all",
        rating: rating ? parseFloat(rating) : 0,
        distance: distance ? parseFloat(distance) : 100,
        priceRange: "all",
        openNow: false,
      });
      setIsSearching(true);
    }
  }, [searchParams]);

  const handleSearch = (query: string, newFilters: SearchFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
    setIsSearching(true);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Filter shops based on search query and filters
  const filteredShops = SAMPLE_SHOPS.filter((shop) => {
    // Text search filter
    const matchesQuery = !searchQuery || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = filters.category === "all" || 
      shop.category.toLowerCase() === filters.category.toLowerCase();

    // Rating filter
    const matchesRating = filters.rating === 0 || shop.rating >= filters.rating;

    // Distance filter
    const shopDistance = parseFloat(shop.distance);
    const matchesDistance = shopDistance <= filters.distance;

    // Open now filter
    const matchesOpenNow = !filters.openNow || shop.isOpen;

    return matchesQuery && matchesCategory && matchesRating && matchesDistance && matchesOpenNow;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Explore</h1>
              <p className="text-muted-foreground">Discover amazing shops and services near you</p>
            </div>
          </div>
          
          {/* Advanced Search */}
          <div className="mt-6">
            <AdvancedSearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Search Results Section */}
        {isSearching && (
          <>
            <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Filtered Results"}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Found {filteredShops.length} {filteredShops.length === 1 ? "shop" : "shops"}
              </p>
            </div>

            {filteredShops.length > 0 ? (
              <div className="mb-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-14 text-center py-12">
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No shops found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search filters or query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      category: "all",
                      rating: 0,
                      distance: 100,
                      priceRange: "all",
                      openNow: false,
                    });
                    setIsSearching(false);
                  }}
                  className="text-primary hover:underline font-semibold"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Category Filter */}
        {!isSearching && (
          <>
            <section className="mb-8">
              <CategoryFilter 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </section>
            
            {/* Trending Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Trending This Week</h2>
              </div>
              <p className="text-sm text-muted-foreground">Check out the most popular shops and services in your area</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PhotoFeed activeCategory={activeCategory} />
              </div>
              <div className="space-y-6">
                <ExploreCategorySection />
                <ReelsSection />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Explore;
