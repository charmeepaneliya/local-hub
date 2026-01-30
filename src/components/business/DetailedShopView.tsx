import { useState } from "react";
import { Star, MapPin, Clock, Phone, Mail, Globe, Truck, CreditCard, Award, Shield, TrendingUp, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopCard, { ShopData } from "./ShopCard";
import { Card } from "@/components/ui/card";

interface DetailedShopInfoProps {
  shop: ShopData;
  onClose?: () => void;
}

// Sample reviews data
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    content: "Amazing quality products! Fast delivery and excellent customer service. Highly recommended!",
    helpful: 24,
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 4,
    date: "1 week ago",
    content: "Great selection and competitive prices. Will definitely shop here again.",
    helpful: 18,
  },
  {
    id: 3,
    author: "Emma Davis",
    rating: 5,
    date: "2 weeks ago",
    content: "Best in town! The staff is super helpful and friendly. 10/10 experience!",
    helpful: 32,
  },
];

export const DetailedShopInfo = ({ shop, onClose }: DetailedShopInfoProps) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getFeatures = () => {
    switch (shop.type) {
      case "wholesaler":
        return [
          { icon: TrendingUp, label: "Bulk Orders", desc: "Min order: " + (shop.minOrder || "Contact") },
          { icon: Truck, label: "Fast Delivery", desc: "Free delivery on bulk" },
          { icon: Award, label: "Quality Guaranteed", desc: "100% authentic" },
          { icon: CreditCard, label: "Flexible Payment", desc: "Credit available" },
        ];
      case "small-business":
        return [
          { icon: Users, label: "Handmade", desc: "Crafted with love" },
          { icon: Award, label: "Unique Items", desc: "Limited edition" },
          { icon: Truck, label: "Local Delivery", desc: "Fast & reliable" },
          { icon: Shield, label: "Verified Seller", desc: "Trusted quality" },
        ];
      default:
        return [
          { icon: Award, label: "Quality Products", desc: "Carefully selected" },
          { icon: Truck, label: "Quick Delivery", desc: "Same day available" },
          { icon: CreditCard, label: "Easy Payment", desc: "Multiple options" },
          { icon: Shield, label: "Secure Shopping", desc: "100% safe" },
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden h-96 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Shop Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
              <p className="text-lg text-gray-200 mb-4">{shop.category}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{shop.rating}</span>
                  <span className="text-sm">({shop.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="w-5 h-5" />
                  <span>{shop.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {getFeatures().map(({ icon: Icon, label, desc }, i) => (
          <Card key={i} className="p-4 text-center border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-semibold text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 border border-primary/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6 border-primary/20">
            <h2 className="text-xl font-bold mb-4">About {shop.name}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{shop.description}</p>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {shop.tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Opening Hours</h3>
              </div>
              <p className="text-foreground font-mono">{shop.hours}</p>
            </div>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card className="p-6 border-primary/20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">{shop.rating}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.round(shop.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{shop.reviews} verified reviews</p>
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              {SAMPLE_REVIEWS.map((review) => (
                <div key={review.id} className="border-b border-primary/10 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.content}</p>
                  <button className="text-xs text-primary hover:underline">👍 Helpful ({review.helpful})</button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card className="p-6 border-primary/20">
            <h2 className="text-xl font-bold mb-6">Business Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {shop.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${shop.phone}`} className="text-foreground font-semibold hover:text-primary">
                        {shop.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground font-semibold">{shop.address || "Downtown District"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery</p>
                    <p className="text-foreground font-semibold">Free delivery on orders above ₹500</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Methods</p>
                    <p className="text-foreground font-semibold">UPI, Card, Cash, Wallet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Discount Info */}
            {shop.discount && (
              <div className="mt-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="font-semibold text-red-600 mb-1">🎉 Special Offer</p>
                <p className="text-foreground">{shop.discount} on selected items</p>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <Card className="p-6 border-primary/20">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="bg-muted rounded-xl h-96 flex items-center justify-center border border-primary/20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12 bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white font-semibold rounded-xl">
          🛒 Shop Now
        </Button>
        <Button variant="outline" className="h-12 border-primary/30 hover:bg-primary/10 rounded-xl font-semibold">
          ❓ Contact Shop
        </Button>
      </div>
    </div>
  );
};
