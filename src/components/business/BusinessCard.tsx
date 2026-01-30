import { Star, MapPin, Clock, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
  business: {
    id: number;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    distance: string;
    hours: string;
    image: string;
    isOpen: boolean;
    tags: string[];
    description: string;
  };
  onBook: (business: any) => void;
}

const BusinessCard = ({ business, onBook }: BusinessCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground"
        >
          <Heart className="w-4 h-4" />
        </Button>

        <Badge
          className={`absolute top-3 left-3 ${
            business.isOpen
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {business.isOpen ? "Open Now" : "Closed"}
        </Badge>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-primary-foreground mb-1">
            {business.name}
          </h3>
          <p className="text-sm text-primary-foreground/80">{business.category}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-medium text-foreground">{business.rating}</span>
            <span>({business.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{business.distance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{business.hours}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {business.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {business.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          onClick={() => onBook(business)}
          className="w-full gradient-primary text-primary-foreground border-0"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default BusinessCard;
