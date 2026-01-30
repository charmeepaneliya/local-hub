import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar";
import CategoryFilter from "@/components/home/CategoryFilter";
import ShopCard, { ShopData } from "@/components/business/ShopCard";
import { AppointmentBusinessData } from "@/components/business/AppointmentCard";
import AppointmentSection from "@/components/appointments/AppointmentSection";
import AdPost from "@/components/business/AdPost";
import BookingModal from "@/components/booking/BookingModal";
import ChatWidget from "@/components/chat/ChatWidget";
import ReelsSection from "@/components/feed/ReelsSection";
import PhotoFeed from "@/components/feed/PhotoFeed";
import ExploreCategorySection from "@/components/feed/ExploreCategorySection";
import { FeaturedShopsCarousel } from "@/components/home/FeaturedShopsCarousel";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { PlatformStats } from "@/components/home/PlatformStats";
import TrendingShopsSection from "@/components/feed/TrendingShopsSection";
import FlashDealsSection from "@/components/feed/FlashDealsSection";
import NearMeSection from "@/components/feed/NearMeSection";
import RecentlyViewedSection from "@/components/feed/RecentlyViewedSection";
import { MapPin, TrendingUp, Store, Package, Briefcase, Zap, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchFilters {
  category: string;
  rating: number;
  distance: number;
  priceRange: string;
  openNow: boolean;
}

// Helper function to get dynamic shop hours based on current time
const getDynamicHours = (baseOpen: number, baseClose: number) => {
  const now = new Date().getHours();
  const isCurrentlyOpen = now >= baseOpen && now < baseClose;
  const openHour = String(baseOpen).padStart(2, "0");
  const closeHour = String(baseClose).padStart(2, "0");
  return {
    hours: `${openHour}:00 - ${closeHour}:00`,
    isOpen: isCurrentlyOpen,
  };
};

// Shops Data with dynamic open/close status
const getShopsData = () => [
  {
    id: 1,
    name: "Fashion Hub",
    category: "Clothing & Fashion",
    type: "shop" as const,
    rating: 4.6,
    reviews: 234,
    distance: "0.3 mi",
    image: "https://images.pexels.com/photos/5424910/pexels-photo-5424910.jpeg",
    tags: ["Clothing", "Accessories", "Trendy"],
    description: "Latest fashion trends at affordable prices",
    discount: "30% OFF",
    ...getDynamicHours(10, 21),
  },
  {
    id: 2,
    name: "Tech World",
    category: "Electronics",
    type: "shop" as const,
    rating: 4.8,
    reviews: 567,
    distance: "0.5 mi",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    tags: ["Mobiles", "Laptops", "Gadgets"],
    description: "Your one-stop shop for all electronics",
    ...getDynamicHours(9, 20),
  },
  {
    id: 3,
    name: "Green Grocery",
    category: "Grocery Store",
    type: "shop" as const,
    rating: 4.5,
    reviews: 189,
    distance: "0.2 mi",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    tags: ["Fresh", "Organic", "Daily Needs"],
    description: "Fresh vegetables and daily essentials",
    ...getDynamicHours(7, 22),
  },
  {
    id: 14,
    name: "Book Paradise",
    category: "Books & Stationery",
    type: "shop" as const,
    rating: 4.7,
    reviews: 312,
    distance: "0.4 mi",
    image: "https://images.pexels.com/photos/2925304/pexels-photo-2925304.jpeg",
    tags: ["Books", "Stationery", "Gifts"],
    description: "Your neighborhood bookstore",
    discount: "15% OFF",
    ...getDynamicHours(9, 21),
  },
];
const shops = getShopsData();

// Wholesalers Data with dynamic status
const getWholesalersData = () => [
  {
    id: 4,
    name: "Textile Mart",
    category: "Wholesale Fabrics",
    type: "wholesaler" as const,
    rating: 4.7,
    reviews: 342,
    distance: "1.2 mi",
    image: "https://images.pexels.com/photos/3965543/pexels-photo-3965543.jpeg",
    tags: ["Cotton", "Silk", "Polyester"],
    description: "Bulk fabrics at factory prices",
    minOrder: "₹5,000",
    discount: "Bulk Deals",
    ...getDynamicHours(8, 18),
  },
  {
    id: 5,
    name: "Electronics Wholesale",
    category: "Wholesale Electronics",
    type: "wholesaler" as const,
    rating: 4.4,
    reviews: 156,
    distance: "2.0 mi",
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    tags: ["Mobiles", "Accessories", "Parts"],
    description: "Wholesale electronics for retailers",
    minOrder: "₹10,000",
    ...getDynamicHours(9, 19),
  },
  {
    id: 6,
    name: "Spice Traders",
    category: "Wholesale Spices",
    type: "wholesaler" as const,
    rating: 4.9,
    reviews: 89,
    distance: "1.5 mi",
    image: "https://images.pexels.com/photos/4194077/pexels-photo-4194077.jpeg",
    tags: ["Spices", "Dry Fruits", "Herbs"],
    description: "Premium quality spices in bulk",
    minOrder: "₹2,000",
    ...getDynamicHours(6, 16),
  },
  {
    id: 15,
    name: "Footwear Hub",
    category: "Wholesale Footwear",
    type: "wholesaler" as const,
    rating: 4.6,
    reviews: 203,
    distance: "1.8 mi",
    image: "https://images.pexels.com/photos/28902764/pexels-photo-28902764.jpeg",
    tags: ["Shoes", "Sandals", "Sports"],
    description: "All types of footwear at wholesale prices",
    minOrder: "₹8,000",
    discount: "20% Bulk",
    ...getDynamicHours(8, 19),
  },
];
const wholesalers = getWholesalersData();

// Small Business Data with dynamic status
const getSmallBusinessesData = () => [
  {
    id: 7,
    name: "Handmade Crafts",
    category: "Arts & Crafts",
    type: "small-business" as const,
    rating: 4.9,
    reviews: 78,
    distance: "0.4 mi",
    image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg",
    tags: ["Handmade", "Gifts", "Decor"],
    description: "Beautiful handcrafted items by local artisans",
    ...getDynamicHours(11, 19),
  },
  {
    id: 8,
    name: "Home Bakery",
    category: "Home Baker",
    type: "small-business" as const,
    rating: 4.8,
    reviews: 234,
    distance: "0.6 mi",
    image: "https://images.pexels.com/photos/10907000/pexels-photo-10907000.jpeg",
    tags: ["Cakes", "Cookies", "Fresh"],
    description: "Freshly baked goods from home kitchen",
    discount: "10% First Order",
    ...getDynamicHours(8, 18),
  },
  {
    id: 9,
    name: "Tailoring Studio",
    category: "Custom Tailoring",
    type: "small-business" as const,
    rating: 4.7,
    reviews: 156,
    distance: "0.3 mi",
    image: "https://images.pexels.com/photos/6461098/pexels-photo-6461098.jpeg",
    tags: ["Custom", "Alterations", "Designer"],
    description: "Expert tailoring and custom designs",
    ...getDynamicHours(10, 20),
  },
  {
    id: 16,
    name: "Plant Paradise",
    category: "Home Plants",
    type: "small-business" as const,
    rating: 4.8,
    reviews: 145,
    distance: "0.5 mi",
    image: "https://images.pexels.com/photos/5411298/pexels-photo-5411298.jpeg",
    tags: ["Plants", "Pots", "Garden"],
    description: "Indoor & outdoor plants for your home",
    discount: "Buy 2 Get 1",
    ...getDynamicHours(9, 19),
  },
];
const smallBusinesses = getSmallBusinessesData();

// Ads data only - appointments moved to AppointmentSection component

const ads = [
  {
    id: 1,
    businessName: "Mario's Italian Kitchen",
    businessImage: "https://images.pexels.com/photos/4253128/pexels-photo-4253128.jpeg",
    title: "Grand Opening Week Special!",
    description: "Celebrate with us! Get 20% off on all pizzas and pastas. Plus, free tiramisu with orders over ₹500.",
    image: "https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    discount: "20% OFF",
    validUntil: "Jan 15, 2026",
    category: "Restaurant",
  },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    category: "all",
    rating: 0,
    distance: 100,
    priceRange: "all",
    openNow: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query: string, filters: SearchFilters) => {
    // Navigate to Explore page with search active
    navigate(`/explore?q=${encodeURIComponent(query)}&category=${filters.category}&rating=${filters.rating}&distance=${filters.distance}`);
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setSearchFilters(newFilters);
  };

  const handleBookAppointment = (business: AppointmentBusinessData) => {
    setSelectedBusiness({
      id: business.id,
      name: business.name,
      category: business.specialty,
      image: business.image,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section with Gradient Background */}
        <section className="mb-12">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border border-primary/20 overflow-hidden p-8 sm:p-12 mb-6">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative">
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-bold tracking-wider uppercase">📍 Downtown District</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 leading-tight">
                Discover Local Gems Near You
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Connect with trusted shops, wholesalers, local businesses & services. Shop smart, support local! 🚀
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all text-white font-semibold px-6 h-12 rounded-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Now
                </Button>
                <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/5 px-6 h-12 rounded-lg font-semibold">
                  Post Your Business
                </Button>
              </div>
            </div>
          </div>
          
          {/* Advanced Search Bar */}
          <div className="mb-8">
            <AdvancedSearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Zap, label: "Fast Delivery", desc: "Same-day service", color: "from-primary/20 to-primary/5 border-primary/30" },
              { icon: Award, label: "Verified Sellers", desc: "Trusted & rated", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
              { icon: MapPin, label: "Local Support", desc: "Support community", color: "from-green-500/20 to-green-500/5 border-green-500/30" },
              { icon: Sparkles, label: "Latest Offers", desc: "Exclusive deals", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30" },
            ].map(({ icon: Icon, label, desc, color }, i) => (
              <div key={i} className={`bg-gradient-to-br ${color} rounded-xl p-4 border transition-all hover:shadow-md cursor-pointer`}>
                <Icon className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reels / Stories Section */}
        <ReelsSection activeCategory={activeCategory} />

        {/* Featured Shops Carousel */}
        {(activeCategory === "All") && (
          <FeaturedShopsCarousel shops={[...shops, ...wholesalers, ...smallBusinesses].sort((a, b) => b.rating - a.rating).slice(0, 6)} />
        )}

        {/* Recently Viewed Section */}
        {(activeCategory === "All") && (
          <section className="mb-14">
            <RecentlyViewedSection />
          </section>
        )}

        {/* Trending Shops Section */}
        {(activeCategory === "All") && (
          <section className="mb-14">
            <TrendingShopsSection />
          </section>
        )}

        {/* Flash Deals Section */}
        {(activeCategory === "All") && (
          <section className="mb-14">
            <FlashDealsSection />
          </section>
        )}

        {/* Near Me Section */}
        {(activeCategory === "All") && (
          <section className="mb-14">
            <NearMeSection />
          </section>
        )}

        {/* Categories */}
        <section className="mb-10">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Conditional Sections based on category */}
        {(activeCategory === "All" || activeCategory === "Shops") && (
          <section className="mb-14">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-end gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-foreground">Retail Shops</h2>
                  <p className="text-sm text-muted-foreground">
                    {shops.filter((s) => s.isOpen).length} open now • {shops.length} total nearby
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg text-white font-semibold rounded-xl px-6 h-11">
                View All →
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </section>
        )}

        {(activeCategory === "All" || activeCategory === "Wholesalers") && (
          <section className="mb-14">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-end gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-foreground">Wholesalers</h2>
                  <p className="text-sm text-muted-foreground">Bulk orders • Premium deals available</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-500/30 px-4 py-2 text-sm font-semibold">
                ⚡ Bulk Deals
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {wholesalers.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </section>
        )}

        {(activeCategory === "All" || activeCategory === "Small Business") && (
          <section className="mb-14">
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-end gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-foreground">Local Businesses</h2>
                  <p className="text-sm text-muted-foreground">Support local creators & artisans</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-500/30 px-4 py-2 text-sm font-semibold">
                ❤️ Support Local
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {smallBusinesses.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </section>
        )}

        {(activeCategory === "All" || activeCategory === "Appointments" || 
          activeCategory === "Salons" || activeCategory === "Health" || activeCategory === "Restaurants") && (
          <AppointmentSection onBook={handleBookAppointment} />
        )}

        {/* Explore by Category Section */}
        <ExploreCategorySection />

        {/* Platform Stats */}
        <PlatformStats />

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* Main Content Grid - Feed & Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Left Column - Feed */}
          <div className="lg:col-span-2">
            <PhotoFeed activeCategory={activeCategory} />
          </div>

          {/* Right Column - Trending */}
          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Trending Offers</h2>
              </div>
              {ads.map((ad) => (
                <AdPost key={ad.id} ad={ad} />
              ))}
            </section>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {selectedBusiness && (
        <BookingModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
