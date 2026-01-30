import { useState } from "react";
import { Calendar, Clock, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShopData } from "./ShopCard";

interface ShopBookingProps {
  shop: ShopData;
  open: boolean;
  onClose: () => void;
  onBookingConfirm?: (booking: BookingData) => void;
}

export interface BookingData {
  shopId: number;
  date: string;
  time: string;
  duration: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

const ShopBooking = ({ shop, open, onClose, onBookingConfirm }: ShopBookingProps) => {
  const [step, setStep] = useState<"date" | "time" | "details">("date");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const handleNext = () => {
    if (step === "date") {
      setStep("time");
    } else if (step === "time") {
      setStep("details");
    }
  };

  const handlePrevious = () => {
    if (step === "time") {
      setStep("date");
    } else if (step === "details") {
      setStep("time");
    }
  };

  const handleSubmit = () => {
    if (name && phone && email && selectedDate && selectedTime) {
      const booking: BookingData = {
        shopId: shop.id,
        date: selectedDate,
        time: selectedTime,
        duration,
        name,
        phone,
        email,
        notes,
      };

      onBookingConfirm?.(booking);
      setSubmitted(true);

      setTimeout(() => {
        handleReset();
        onClose();
      }, 2000);
    }
  };

  const handleReset = () => {
    setStep("date");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setSelectedTime("");
    setDuration(30);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setSubmitted(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book {shop.name}</DialogTitle>
          <DialogDescription>Reserve your slot in advance</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-600">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We've sent you a confirmation email. See you at {selectedTime}!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Indicator */}
            <div className="flex gap-2 mb-6">
              {(["date", "time", "details"] as const).map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    step === s || (step === "time" && s === "date") || step === "details"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Date Selection */}
            {step === "date" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                  />
                </div>
                <Button onClick={handleNext} className="w-full">
                  Next
                </Button>
              </div>
            )}

            {/* Time Selection */}
            {step === "time" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select Time</label>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Duration</label>
                  <div className="flex gap-2">
                    {[15, 30, 45, 60].map((d) => (
                      <Badge
                        key={d}
                        variant={duration === d ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setDuration(d)}
                      >
                        {d}m
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePrevious} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Details */}
            {step === "details" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Full Name</label>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone Number</label>
                  <Input
                    placeholder="Your phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Email</label>
                  <Input
                    placeholder="Your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Notes (Optional)</label>
                  <textarea
                    placeholder="Any special requests..."
                    className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Summary */}
                <div className="bg-muted p-3 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Date
                    </span>
                    <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Time
                    </span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-semibold">{duration} minutes</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePrevious} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShopBooking;
