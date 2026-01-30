import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const BusinessDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock business data
  const business = {
    id: 1,
    name: "Fashion Hub",
    category: "Clothing & Fashion",
    type: "shop",
    rating: 4.6,
    reviews: 234,
    distance: "0.3 mi",
    hours: "10AM - 9PM",
    address: "123 Main St, Downtown District",
    phone: "+1 (555) 123-4567",
    email: "hello@fashionhub.com",
    website: "www.fashionhub.com",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=1000&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&h=600&fit=crop",
    ],
    tags: ["Clothing", "Accessories", "Trendy"],
    description:
      "Fashion Hub is your ultimate destination for the latest fashion trends at affordable prices. We specialize in contemporary clothing, accessories, and lifestyle products.",
    discount: "30% OFF",
    isOpen: true,
    reviews_list: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        comment: "Amazing collection and great customer service!",
        date: "2 days ago",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: 2,
        author: "Mike Chen",
        rating: 4,
        comment: "Good quality products at reasonable prices",
        date: "1 week ago",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: 3,
        author: "Emma Wilson",
        rating: 5,
        comment: "Best fashion store in the area!",
        date: "2 weeks ago",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ],
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      description: isFavorite ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.description,
        url: window.location.href,
      });
    } else {
      toast({
        description: "Link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-2 rounded-lg hover:bg-secondary"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-muted">
                <img
                  src={business.images[selectedImage]}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card"
                    variant="ghost"
                    onClick={handleFavorite}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        isFavorite ? "fill-accent text-accent" : "text-foreground"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card"
                    variant="ghost"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5 text-foreground" />
                  </Button>
                </div>

                {/* Discount Badge */}
                {business.discount && (
                  <Badge className="absolute top-4 left-4 bg-warning text-warning-foreground text-lg font-bold px-3 py-1">
                    {business.discount}
                  </Badge>
                )}

                {/* Status Badge */}
                <Badge
                  className={`absolute bottom-4 left-4 ${
                    business.isOpen
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mr-2 bg-current" />
                  {business.isOpen ? "Open Now" : "Closed"}
                </Badge>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {business.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary shadow-lg"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${business.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{business.name}</h1>
              <p className="text-muted-foreground mb-4">{business.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span className="text-lg font-bold text-foreground">{business.rating}</span>
                  <span className="text-muted-foreground">({business.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Popular
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">{business.description}</p>

              {/* Tags */}
              {business.tags && business.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {business.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Location & Hours */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground font-medium">{business.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="text-foreground font-medium">{business.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${business.phone}`}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Chat</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-foreground hover:text-accent"
                      >
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
              <div className="space-y-4">
                {business.reviews_list.map((review) => (
                  <Card key={review.id} className="border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-warning text-warning"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Call to Action */}
            <div className="sticky top-20 space-y-4">
              <Button className="w-full gradient-primary rounded-xl h-12 text-lg font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl h-12 border-primary/20"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </Button>

              {/* Info Card */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Business Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Distance</p>
                    <p className="text-foreground font-medium">{business.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {business.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Website</p>
                    <a
                      href={`https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {business.website}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Share this business</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-lg flex-1 border-border/50"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-lg flex-1 border-border/50"
                      onClick={handleFavorite}
                    >
                      <Heart 
                        className={`w-4 h-4 ${isFavorite ? "fill-accent text-accent" : ""}`} 
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDetailPage;
