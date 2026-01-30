import { useState } from "react";
import { Sliders, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  distance: number;
  categories: string[];
  openNow: boolean;
  deliveryAvailable: boolean;
}

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  defaultFilters?: FilterOptions;
}

const CATEGORIES = [
  "Clothing & Fashion",
  "Electronics",
  "Food & Beverages",
  "Beauty & Spa",
  "Health & Wellness",
  "Home & Living",
  "Sports & Fitness",
  "Arts & Crafts",
];

export const AdvancedFilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  defaultFilters = {
    priceRange: [0, 10000],
    rating: 3.5,
    distance: 5,
    categories: [],
    openNow: false,
    deliveryAvailable: false,
  },
}: AdvancedFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (value: number[]) => {
    setFilters({ ...filters, rating: value[0] });
  };

  const handleDistanceChange = (value: number[]) => {
    setFilters({ ...filters, distance: value[0] });
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 10000],
      rating: 3.5,
      distance: 5,
      categories: [],
      openNow: false,
      deliveryAvailable: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            Advanced Filters
          </DialogTitle>
          <DialogDescription>
            Fine-tune your search with advanced options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 dark:text-white">
                Price Range
              </label>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={10000}
              step={100}
              className="w-full"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 dark:text-white">
                Minimum Rating
              </label>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {filters.rating}★ & above
              </span>
            </div>
            <Slider
              value={[filters.rating]}
              onValueChange={handleRatingChange}
              min={1}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Distance Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900 dark:text-white">
                Distance
              </label>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Within {filters.distance} km
              </span>
            </div>
            <Slider
              value={[filters.distance]}
              onValueChange={handleDistanceChange}
              min={0.5}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="font-semibold text-slate-900 dark:text-white block">
              Categories
            </label>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Options */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="openNow"
                checked={filters.openNow}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, openNow: checked as boolean })
                }
              />
              <label htmlFor="openNow" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                Open Now
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="delivery"
                checked={filters.deliveryAvailable}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, deliveryAvailable: checked as boolean })
                }
              />
              <label htmlFor="delivery" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                Delivery Available
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white"
            onClick={handleApply}
          >
            <Check className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilterDialog;
