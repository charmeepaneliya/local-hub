import { Star, MapPin, Clock, Heart, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface AppointmentBusinessData {
  id: number;
  name: string;
  category: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  nextAvailable: string;
  image: string;
  isOpen: boolean;
  services: string[];
  description: string;
  priceRange: string;
}

interface AppointmentCardProps {
  business: AppointmentBusinessData;
  onBook: (business: AppointmentBusinessData) => void;
}

const AppointmentCard = ({ business, onBook }: AppointmentCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 flex">
      <div className="relative w-28 sm:w-36 flex-shrink-0">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground h-7 w-7"
        >
          <Heart className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="flex-1 p-3 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-foreground text-sm">{business.name}</h3>
              <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/20" />
            </div>
            <p className="text-xs text-muted-foreground">{business.specialty}</p>
          </div>
          <Badge className="bg-warning/10 text-warning border-0 text-xs">
            {business.priceRange}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span className="font-medium text-foreground">{business.rating}</span>
            <span>({business.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{business.distance}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {business.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs py-0">
              {service}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3 text-success" />
            <span className="text-success font-medium">{business.nextAvailable}</span>
          </div>
          <Button
            size="sm"
            onClick={() => onBook(business)}
            className="h-7 text-xs gradient-primary text-primary-foreground border-0"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
