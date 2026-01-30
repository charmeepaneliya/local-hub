import { useState } from "react";
import { Search, MapPin, Filter, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface SearchFilters {
  category: string;
  rating: number;
  distance: number;
  priceRange: string;
  openNow: boolean;
}

interface AdvancedSearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  onFilterChange?: (filters: SearchFilters) => void;
}

const AdvancedSearchBar = ({ onSearch, onFilterChange }: AdvancedSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    rating: 0,
    distance: 100,
    priceRange: "all",
    openNow: false,
  });
  const [location, setLocation] = useState("Current Location");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery, filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "all" && v !== 0 && v !== false
  ).length;

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex items-center gap-2 bg-card rounded-2xl p-2 card-shadow hover:card-shadow-hover transition-shadow">
        {/* Location Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3"
          title="Select Location"
        >
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground hidden sm:inline">{location}</span>
        </Button>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search shops, services, restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-0 focus-visible:ring-primary rounded-xl"
          />
        </div>

        {/* Filters Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="relative px-3 text-muted-foreground hover:text-foreground"
            >
              <Sliders className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Category Filter */}
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal py-2">
              Category
            </DropdownMenuLabel>
            {["All", "Shops", "Restaurants", "Services", "Wholesalers"].map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => updateFilter("category", cat.toLowerCase())}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      filters.category === cat.toLowerCase()
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}
                  />
                  <span>{cat}</span>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Rating Filter */}
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal py-2">
              Minimum Rating
            </DropdownMenuLabel>
            {["All", "4.0+", "4.5+", "4.8+"].map((rating) => (
              <DropdownMenuItem
                key={rating}
                onClick={() =>
                  updateFilter(
                    "rating",
                    rating === "All" ? 0 : parseFloat(rating)
                  )
                }
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      (filters.rating === 0 && rating === "All") ||
                      filters.rating === parseFloat(rating)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}
                  />
                  <span>{rating}</span>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Distance Filter */}
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal py-2">
              Max Distance: {filters.distance} km
            </DropdownMenuLabel>
            <div className="px-4 py-2">
              <input
                type="range"
                min="1"
                max="50"
                value={filters.distance}
                onChange={(e) => updateFilter("distance", parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <DropdownMenuSeparator />

            {/* Open Now Toggle */}
            <DropdownMenuItem
              onClick={() => updateFilter("openNow", !filters.openNow)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`w-3 h-3 rounded border-2 ${
                    filters.openNow
                      ? "bg-success border-success"
                      : "border-muted-foreground"
                  }`}
                />
                <span>Open Now Only</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button */}
        <Button
          type="submit"
          size="sm"
          className="gradient-primary rounded-xl px-6 text-foreground font-medium"
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default AdvancedSearchBar;
