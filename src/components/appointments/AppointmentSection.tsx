import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Stethoscope, Scissors, Leaf, UtensilsCrossed, Wrench } from "lucide-react";
import AppointmentCard, { AppointmentBusinessData } from "@/components/business/AppointmentCard";

const appointmentCategories = [
  { id: "all", name: "All", icon: Calendar },
  { id: "clinic", name: "Clinic", icon: Stethoscope },
  { id: "salon", name: "Hair Salon & Spa", icon: Scissors },
  { id: "yoga", name: "Yoga & Meditation", icon: Leaf },
  { id: "restaurant", name: "Restaurants", icon: UtensilsCrossed },
  { id: "repair", name: "Repair & Service", icon: Wrench },
];

const appointmentBusinesses: AppointmentBusinessData[] = [
  // Clinics
  {
    id: 1,
    name: "City Health Clinic",
    category: "clinic",
    specialty: "General Physician & Specialists",
    rating: 4.9,
    reviews: 456,
    distance: "0.3 mi",
    nextAvailable: "Today 11:00 AM",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["General Checkup", "Blood Tests", "X-Ray", "Vaccination"],
    description: "Trusted family healthcare center",
    priceRange: "₹₹",
  },
  {
    id: 2,
    name: "Dental Care Plus",
    category: "clinic",
    specialty: "Dental Clinic",
    rating: 4.8,
    reviews: 312,
    distance: "0.5 mi",
    nextAvailable: "Today 3:00 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Cleaning", "Filling", "Root Canal", "Braces"],
    description: "Modern dental treatments",
    priceRange: "₹₹₹",
  },
  {
    id: 3,
    name: "Eye Care Center",
    category: "clinic",
    specialty: "Ophthalmology",
    rating: 4.7,
    reviews: 189,
    distance: "0.8 mi",
    nextAvailable: "Tomorrow 10:00 AM",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Eye Test", "Glasses", "Contact Lens", "Surgery"],
    description: "Complete eye care solutions",
    priceRange: "₹₹",
  },

  // Hair Salon & Spa
  {
    id: 4,
    name: "Glamour Studio",
    category: "salon",
    specialty: "Unisex Salon & Spa",
    rating: 4.9,
    reviews: 567,
    distance: "0.2 mi",
    nextAvailable: "Today 1:00 PM",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Haircut", "Coloring", "Facial", "Massage"],
    description: "Premium beauty & wellness",
    priceRange: "₹₹₹",
  },
  {
    id: 5,
    name: "The Barber Shop",
    category: "salon",
    specialty: "Men's Grooming",
    rating: 4.8,
    reviews: 423,
    distance: "0.4 mi",
    nextAvailable: "Today 2:30 PM",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Haircut", "Beard Trim", "Shave", "Hair Spa"],
    description: "Classic men's grooming",
    priceRange: "₹₹",
  },
  {
    id: 6,
    name: "Serenity Spa",
    category: "salon",
    specialty: "Luxury Spa & Wellness",
    rating: 4.9,
    reviews: 289,
    distance: "0.6 mi",
    nextAvailable: "Today 4:00 PM",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Body Massage", "Aromatherapy", "Facial", "Sauna"],
    description: "Relax & rejuvenate",
    priceRange: "₹₹₹",
  },

  // Yoga & Meditation
  {
    id: 7,
    name: "Zen Yoga Studio",
    category: "yoga",
    specialty: "Yoga & Meditation Center",
    rating: 4.9,
    reviews: 345,
    distance: "0.5 mi",
    nextAvailable: "Tomorrow 6:00 AM",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Hatha Yoga", "Vinyasa", "Meditation", "Pranayama"],
    description: "Find your inner peace",
    priceRange: "₹₹",
  },
  {
    id: 8,
    name: "Mindful Living",
    category: "yoga",
    specialty: "Holistic Wellness",
    rating: 4.8,
    reviews: 234,
    distance: "0.7 mi",
    nextAvailable: "Today 5:00 PM",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Power Yoga", "Sound Healing", "Reiki", "Counseling"],
    description: "Transform your life",
    priceRange: "₹₹",
  },
  {
    id: 9,
    name: "Fitness Flow",
    category: "yoga",
    specialty: "Yoga & Fitness",
    rating: 4.7,
    reviews: 178,
    distance: "1.0 mi",
    nextAvailable: "Tomorrow 7:00 AM",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Aerial Yoga", "Hot Yoga", "Pilates", "Zumba"],
    description: "Energize your body",
    priceRange: "₹₹₹",
  },

  // Restaurants
  {
    id: 10,
    name: "The Grand Kitchen",
    category: "restaurant",
    specialty: "Multi-Cuisine Restaurant",
    rating: 4.8,
    reviews: 876,
    distance: "0.3 mi",
    nextAvailable: "Today 7:30 PM",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Dine-in", "Private Dining", "Events", "Catering"],
    description: "Fine dining experience",
    priceRange: "₹₹₹",
  },
  {
    id: 11,
    name: "Spice Garden",
    category: "restaurant",
    specialty: "Indian Cuisine",
    rating: 4.7,
    reviews: 543,
    distance: "0.4 mi",
    nextAvailable: "Today 8:00 PM",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Dine-in", "Takeaway", "Delivery", "Party Orders"],
    description: "Authentic Indian flavors",
    priceRange: "₹₹",
  },
  {
    id: 12,
    name: "Café Milano",
    category: "restaurant",
    specialty: "Italian & Continental",
    rating: 4.6,
    reviews: 432,
    distance: "0.6 mi",
    nextAvailable: "Today 6:30 PM",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Breakfast", "Lunch", "Dinner", "Coffee"],
    description: "Cozy café vibes",
    priceRange: "₹₹",
  },

  // Repair & Service Shops
  {
    id: 13,
    name: "Quick Fix Electronics",
    category: "repair",
    specialty: "Mobile & Laptop Repair",
    rating: 4.8,
    reviews: 678,
    distance: "0.2 mi",
    nextAvailable: "Today 11:30 AM",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Screen Repair", "Battery", "Software", "Data Recovery"],
    description: "Expert device repairs",
    priceRange: "₹₹",
  },
  {
    id: 14,
    name: "Auto Care Center",
    category: "repair",
    specialty: "Car Service & Repair",
    rating: 4.7,
    reviews: 432,
    distance: "0.8 mi",
    nextAvailable: "Tomorrow 9:00 AM",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["Oil Change", "Brake Service", "AC Repair", "Detailing"],
    description: "Complete car care",
    priceRange: "₹₹₹",
  },
  {
    id: 15,
    name: "Home Appliance Hub",
    category: "repair",
    specialty: "Home Appliance Repair",
    rating: 4.6,
    reviews: 267,
    distance: "0.5 mi",
    nextAvailable: "Today 2:00 PM",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
    isOpen: true,
    services: ["AC Repair", "Washing Machine", "Refrigerator", "TV"],
    description: "All appliances fixed",
    priceRange: "₹₹",
  },
];

interface AppointmentSectionProps {
  onBook: (business: AppointmentBusinessData) => void;
}

const AppointmentSection = ({ onBook }: AppointmentSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBusinesses = activeTab === "all" 
    ? appointmentBusinesses 
    : appointmentBusinesses.filter(b => b.category === activeTab);

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5">
          <Calendar className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Book Appointments</h2>
          <p className="text-sm text-muted-foreground">Schedule visits to your favorite places</p>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-transparent p-0 mb-6">
          {appointmentCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-warning data-[state=active]:to-warning/80 data-[state=active]:text-warning-foreground data-[state=active]:shadow-lg data-[state=inactive]:bg-secondary data-[state=inactive]:text-secondary-foreground data-[state=inactive]:hover:bg-warning/10 transition-all"
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium text-sm whitespace-nowrap">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No appointments available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBusinesses.map((business) => (
                <AppointmentCard
                  key={business.id}
                  business={business}
                  onBook={onBook}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AppointmentSection;
