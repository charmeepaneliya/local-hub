import { Utensils, Scissors, Stethoscope, Store, Package, Briefcase, Calendar, Sparkles } from "lucide-react";

const categories = [
  { name: "All", icon: Sparkles, color: "primary" },
  { name: "Shops", icon: Store, color: "primary" },
  { name: "Wholesalers", icon: Package, color: "accent" },
  { name: "Small Business", icon: Briefcase, color: "success" },
  { name: "Appointments", icon: Calendar, color: "warning" },
  { name: "Restaurants", icon: Utensils, color: "primary" },
  { name: "Salons", icon: Scissors, color: "accent" },
  { name: "Health", icon: Stethoscope, color: "success" },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
            activeCategory === category.name
              ? "gradient-primary text-primary-foreground card-shadow"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          }`}
        >
          <category.icon className="w-4 h-4" />
          <span className="font-medium text-sm">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
