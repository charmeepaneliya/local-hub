import Header from "@/components/layout/Header";
import AdvancedSearchBar from "@/components/search/AdvancedSearchBar";
import CategoryFilter from "@/components/home/CategoryFilter";
import PhotoFeed from "@/components/feed/PhotoFeed";
import ExploreCategorySection from "@/components/feed/ExploreCategorySection";
import ReelsSection from "@/components/feed/ReelsSection";
import { useState } from "react";
import { Compass, TrendingUp } from "lucide-react";

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("all");

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
            <AdvancedSearchBar />
          </div>
        </div>
        
        {/* Category Filter */}
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
      </main>
    </div>
  );
};

export default Explore;
