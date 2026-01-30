import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  shopName: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: "Priya Sharma",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Local Connect Hub has revolutionized how I shop! I found the best local businesses and save so much time. Highly recommended!",
    rating: 5,
    shopName: "Tech World",
  },
  {
    id: 2,
    author: "Raj Kumar",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "As a shop owner, this platform has been a game-changer. I've reached so many new customers and my sales have doubled!",
    rating: 5,
    shopName: "Fashion Hub",
  },
  {
    id: 3,
    author: "Asha Patel",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Finally a platform that celebrates local businesses! I'm able to showcase my handmade designs to the right audience.",
    rating: 5,
    shopName: "Handmade Crafts",
  },
  {
    id: 4,
    author: "Vikas Singh",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "Love the chat feature! Customers can reach me instantly, and the booking system has reduced no-shows significantly.",
    rating: 5,
    shopName: "Mario's Kitchen",
  },
];

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="mb-14 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-foreground mb-2">Success Stories</h2>
          <p className="text-muted-foreground">What our customers & sellers are saying</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-primary/30 hover:bg-primary/10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-primary/30 hover:bg-primary/10"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Testimonial Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20 p-12 overflow-hidden group">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-0 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-primary/30 mb-6" />

          {/* Testimonial Text */}
          <p className="text-2xl font-bold text-foreground mb-8 leading-relaxed">
            "{currentTestimonial.content}"
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-8">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4">
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.author}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">{currentTestimonial.author}</p>
              <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
              <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                {currentTestimonial.shopName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? "bg-primary w-8"
                : "bg-muted-foreground w-2 hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
