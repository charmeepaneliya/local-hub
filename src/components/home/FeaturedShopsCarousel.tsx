import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, Flame, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShopCard, { ShopData } from "@/components/business/ShopCard";

interface FeaturedShopsCarouselProps {
  shops: ShopData[];
}

export const FeaturedShopsCarousel = ({ shops }: FeaturedShopsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(shops.length / 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, shops.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(shops.length / 2)) % Math.ceil(shops.length / 2));
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(shops.length / 2));
    setIsAutoPlay(false);
  };

  // Get top 6 shops by rating
  const featuredShops = [...shops]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-black text-foreground">Featured Shops</h2>
          </div>
          <p className="text-sm text-muted-foreground">Most popular & highly rated businesses near you</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-primary/30 hover:bg-primary/10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-primary/30 hover:bg-primary/10"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out">
          {Array.from({ length: Math.ceil(featuredShops.length / 2) }).map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="w-full flex-shrink-0 grid grid-cols-2 gap-5 px-0"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              {featuredShops.slice(groupIndex * 2, (groupIndex + 1) * 2).map((shop) => (
                <div
                  key={shop.id}
                  className="relative rounded-2xl overflow-hidden group bg-card h-80 cursor-pointer transition-all duration-300 hover:shadow-xl"
                >
                  {/* Background Image */}
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <Badge className="bg-orange-500 text-white border-0 animate-pulse font-bold">
                      <Flame className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    {shop.discount && (
                      <Badge className="bg-red-500 text-white border-0 font-bold">
                        {shop.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white font-bold text-xl mb-2">{shop.name}</h3>
                    <p className="text-gray-200 text-sm mb-3">{shop.category}</p>

                    {/* Rating & Distance */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-bold">{shop.rating}</span>
                        <span className="text-gray-300 text-sm">({shop.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{shop.distance}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1 flex-wrap">
                      {shop.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-white/20 text-white text-xs border-0 backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay - Quick Action */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <Button className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-3 rounded-xl hover:shadow-xl">
                      ✨ Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(featuredShops.length / 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlay(false);
            }}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? "bg-primary w-8"
                : "bg-muted-foreground w-2 hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
