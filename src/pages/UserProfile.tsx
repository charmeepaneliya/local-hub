import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Bookmark,
  Settings,
  LogOut,
  Edit,
  Camera,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";

interface UserStats {
  bookings: number;
  favorites: number;
  reviews: number;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userStats: UserStats = {
    bookings: 12,
    favorites: 28,
    reviews: 7,
  };

  const savedItems = [
    { id: 1, name: "Fashion Hub", category: "Clothing", rating: 4.6 },
    { id: 2, name: "Tech World", category: "Electronics", rating: 4.8 },
    { id: 3, name: "Green Grocery", category: "Grocery", rating: 4.5 },
  ];

  const recentBookings = [
    {
      id: 1,
      businessName: "Style Salon",
      service: "Hair Cut",
      date: "2024-01-28",
      time: "2:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      businessName: "Fitness Plus",
      service: "Gym Session",
      date: "2024-01-30",
      time: "6:00 AM",
      status: "Pending",
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-border/50 overflow-hidden">
            <div className="h-32 gradient-primary" />
            <CardContent className="pt-0">
              <div className="flex items-end gap-4 -mt-16 mb-4 relative z-10">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                      {user?.user_metadata?.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 gradient-primary"
                  >
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </Button>
                </div>
                <div className="flex-1 pb-4">
                  <h1 className="text-3xl font-bold text-foreground">
                    {user?.user_metadata?.full_name || "User"}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="gradient-primary rounded-xl mb-4"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{userStats.bookings}</p>
                  <p className="text-sm text-muted-foreground">Bookings</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{userStats.favorites}</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{userStats.reviews}</p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{user?.email}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">+1 (555) 123-4567</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">Downtown District</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{booking.businessName}</p>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                    <Badge
                      className={
                        booking.status === "Confirmed"
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-lg border-primary/20 mt-4">
                  View All Bookings
                </Button>
              </CardContent>
            </Card>

            {/* Saved Items */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
                <CardDescription>Your favorite shops and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{item.rating} ⭐</Badge>
                      <Heart className="w-5 h-5 text-accent fill-accent" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-lg border-primary/20 mt-4">
                  View All Saved ({userStats.favorites})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Settings Card */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg text-foreground hover:bg-secondary"
                  >
                    <User className="w-4 h-4 mr-3 text-primary" />
                    Account Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg text-foreground hover:bg-secondary"
                  >
                    <Bookmark className="w-4 h-4 mr-3 text-primary" />
                    Privacy & Security
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg text-foreground hover:bg-secondary"
                  >
                    <Heart className="w-4 h-4 mr-3 text-primary" />
                    Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="border-border/50">
                <CardContent className="pt-6 space-y-2">
                  <Button
                    onClick={handleLogout}
                    className="w-full gradient-primary rounded-xl text-primary-foreground font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-destructive/20 text-destructive hover:bg-destructive/5"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-border/50 bg-secondary/30">
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Need Help?</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Contact our support team for any issues or questions.
                  </p>
                  <Button variant="outline" className="w-full rounded-lg border-primary/20 text-primary">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
