import { useState } from "react";
import Header from "@/components/layout/Header";
import { Bookmark, Heart, MapPin, Star, Store, Calendar, Phone, MessageCircle, Share2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const mockSavedBusinesses = [
  {
    id: "1",
    name: "Sharma Hair Salon",
    category: "Salon",
    rating: 4.8,
    reviews: 234,
    location: "Sector 22, Chandigarh",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    isOpen: true,
  },
  {
    id: "2",
    name: "Punjab Electronics",
    category: "Electronics",
    rating: 4.5,
    reviews: 189,
    location: "Sector 17, Chandigarh",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400",
    isOpen: true,
  },
  {
    id: "3",
    name: "Gupta Sweet House",
    category: "Food & Sweets",
    rating: 4.9,
    reviews: 567,
    location: "Phase 3, Mohali",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400",
    isOpen: false,
  },
];

const mockSavedPosts = [
  {
    id: "1",
    businessName: "Trendy Fashion Store",
    content: "New arrivals! Check out our latest summer collection 🌟",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400",
    likes: 234,
  },
  {
    id: "2",
    businessName: "Cafe Delight",
    content: "Weekend special: Buy 1 Get 1 Free on all coffees ☕",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    likes: 456,
  },
];

const Saved = () => {
  const [favorites] = useState([...mockSavedBusinesses]);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Saved Items</h1>
              <p className="text-slate-600 dark:text-slate-300">{favorites.length} items in your favorites</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="businesses" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="businesses">
              Businesses ({mockSavedBusinesses.length})
            </TabsTrigger>
            <TabsTrigger value="posts">
              Posts ({mockSavedPosts.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSavedBusinesses.map(business => (
                <Card key={business.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img 
                      src={business.image} 
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <Bookmark className="w-4 h-4 fill-primary text-primary" />
                    </Button>
                    <Badge 
                      className="absolute bottom-2 left-2"
                      variant={business.isOpen ? "default" : "secondary"}
                    >
                      {business.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{business.name}</h3>
                        <p className="text-sm text-muted-foreground">{business.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{business.rating}</span>
                        <span className="text-xs text-muted-foreground">({business.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{business.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {mockSavedBusinesses.length === 0 && (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No saved businesses</h3>
                <p className="text-muted-foreground">Save businesses to easily find them later!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="posts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockSavedPosts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex">
                    <img 
                      src={post.image} 
                      alt={post.businessName}
                      className="w-32 h-32 object-cover"
                    />
                    <CardContent className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Store className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{post.businessName}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4 fill-primary text-primary" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
            
            {mockSavedPosts.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No saved posts</h3>
                <p className="text-muted-foreground">Save posts to view them later!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Saved;
