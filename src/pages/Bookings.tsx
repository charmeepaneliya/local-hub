import Header from "@/components/layout/Header";
import { Calendar, Clock, MapPin, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBookings = [
  {
    id: "1",
    businessName: "Sharma Hair Salon",
    service: "Hair Cut + Styling",
    date: "2026-01-18",
    time: "10:00 AM",
    status: "upcoming",
    location: "Sector 22, Chandigarh",
    price: "₹350",
  },
  {
    id: "2",
    businessName: "Wellness Spa & Massage",
    service: "Full Body Massage",
    date: "2026-01-20",
    time: "2:00 PM",
    status: "upcoming",
    location: "Phase 7, Mohali",
    price: "₹1,200",
  },
  {
    id: "3",
    businessName: "Dr. Gupta's Dental Clinic",
    service: "Teeth Cleaning",
    date: "2026-01-10",
    time: "11:30 AM",
    status: "completed",
    location: "Sector 17, Chandigarh",
    price: "₹800",
  },
];

const Bookings = () => {
  const upcomingBookings = mockBookings.filter(b => b.status === "upcoming");
  const pastBookings = mockBookings.filter(b => b.status === "completed");

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{booking.businessName}</CardTitle>
              <p className="text-sm text-muted-foreground">{booking.service}</p>
            </div>
          </div>
          <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>
            {booking.status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{booking.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">{booking.price}</span>
          {booking.status === "upcoming" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button variant="destructive" size="sm">Cancel</Button>
            </div>
          )}
          {booking.status === "completed" && (
            <Button variant="outline" size="sm">Book Again</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Bookings</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground">Explore services and book your first appointment!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No past bookings</h3>
                <p className="text-muted-foreground">Your completed bookings will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Bookings;
