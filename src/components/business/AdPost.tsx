import { Tag, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdPostProps {
  ad: {
    id: number;
    businessName: string;
    businessImage: string;
    title: string;
    description: string;
    image: string;
    discount: string;
    validUntil: string;
    category: string;
  };
}

const AdPost = ({ ad }: AdPostProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden card-shadow border-2 border-accent/20 hover:border-accent/40 transition-colors">
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        
        <Badge className="absolute top-3 left-3 gradient-accent text-accent-foreground border-0">
          <Tag className="w-3 h-3 mr-1" />
          Sponsored
        </Badge>

        <div className="absolute bottom-3 left-3 right-3">
          <Badge className="bg-warning text-warning-foreground border-0 text-lg px-3 py-1">
            {ad.discount}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={ad.businessImage}
            alt={ad.businessName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20"
          />
          <div>
            <p className="font-semibold text-foreground">{ad.businessName}</p>
            <p className="text-xs text-muted-foreground">{ad.category}</p>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-2">{ad.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{ad.description}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Valid until {ad.validUntil}</span>
        </div>

        <Button className="w-full gradient-accent text-accent-foreground border-0">
          Claim Offer
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AdPost;
