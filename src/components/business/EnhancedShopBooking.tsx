import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import ShopCard, { ShopData } from "./ShopCard";

export interface BookingData {
  id?: string;
  date: string;
  time: string;
  duration: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  serviceType?: string;
}

interface EnhancedShopBookingProps {
  shop: ShopData;
  open: boolean;
  onClose: () => void;
  onBookingConfirm?: (booking: BookingData) => void;
}

const BOOKING_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"
];

const DURATIONS = [
  { value: "15", label: "15 mins" },
  { value: "30", label: "30 mins" },
  { value: "45", label: "45 mins" },
  { value: "60", label: "1 hour" },
  { value: "120", label: "2 hours" },
];

const SERVICE_TYPES = [
  "Consultation", "Shopping", "Service", "Meeting", "Appointment", "Delivery"
];

const EnhancedShopBooking = ({
  shop,
  open,
  onClose,
  onBookingConfirm,
}: EnhancedShopBookingProps) => {
  const [step, setStep] = useState<"service" | "date" | "time" | "details" | "confirm">("service");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("30");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const handleConfirmBooking = async () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const booking: BookingData = {
        id: `BOOK_${Date.now()}`,
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        name,
        phone,
        email,
        notes,
        serviceType: selectedService,
      };

      setBookingConfirmed(true);
      onBookingConfirm?.(booking);
      
      toast.success("✅ Booking confirmed! Check your email for details.", {
        description: `Booked for ${selectedDate} at ${selectedTime}`,
      });

      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);

      setIsSubmitting(false);
    }, 800);
  };

  const resetForm = () => {
    setStep("service");
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDuration("30");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setBookingConfirmed(false);
  };

  const canProceedToDate = selectedService !== "";
  const canProceedToTime = selectedDate !== "";
  const canProceedToDetails = selectedTime !== "";
  const canConfirm = name.trim() !== "" && phone.trim() !== "" && email.trim() !== "";

  const getProgressPercentage = () => {
    const steps = ["service", "date", "time", "details", "confirm"];
    const currentStepIndex = steps.indexOf(step);
    return ((currentStepIndex + 1) / steps.length) * 100;
  };

  if (bookingConfirmed) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-500/30">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your appointment has been confirmed. A confirmation email has been sent to <strong>{email}</strong>
            </p>
            <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 text-left mb-6 space-y-2 border border-green-500/20">
              <p className="text-sm"><span className="font-semibold">Shop:</span> {shop.name}</p>
              <p className="text-sm"><span className="font-semibold">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
              <p className="text-sm"><span className="font-semibold">Time:</span> {selectedTime}</p>
              <p className="text-sm"><span className="font-semibold">Duration:</span> {DURATIONS.find(d => d.value === selectedDuration)?.label}</p>
            </div>
            <Button onClick={onClose} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Book an Appointment
          </DialogTitle>
          <DialogDescription>{shop.name}</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1">
            <span>{step === "service" && "1. Service"}{step === "date" && "2. Date"}{step === "time" && "3. Time"}{step === "details" && "4. Details"}{step === "confirm" && "5. Confirm"}</span>
            <span>{getProgressPercentage().toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300" 
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Step: Service Selection */}
        {step === "service" && (
          <div className="space-y-4 py-4">
            <h3 className="font-bold text-foreground text-lg">What service do you need?</h3>
            <div className="grid grid-cols-2 gap-3">
              {SERVICE_TYPES.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                    selectedService === service
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-muted/30 hover:border-primary/50"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setStep("date")}
              disabled={!canProceedToDate}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl"
            >
              Continue →
            </Button>
          </div>
        )}

        {/* Step: Date Selection */}
        {step === "date" && (
          <div className="space-y-4 py-4">
            <h3 className="font-bold text-foreground text-lg">Select a date</h3>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                max={getMaxDate()}
                className="flex-1 px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none bg-white/50 dark:bg-slate-900/50"
              />
            </div>
            {selectedDate && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-sm text-foreground">
                  Selected: <strong>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                onClick={() => setStep("service")}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                ← Back
              </Button>
              <Button
                onClick={() => setStep("time")}
                disabled={!canProceedToTime}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step: Time Selection */}
        {step === "time" && (
          <div className="space-y-4 py-4">
            <h3 className="font-bold text-foreground text-lg">Select time & duration</h3>
            
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Time</p>
              <ScrollArea className="h-32 border border-primary/20 rounded-xl p-3 bg-white/50 dark:bg-slate-900/50">
                <div className="grid grid-cols-4 gap-2">
                  {BOOKING_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${
                        selectedTime === slot
                          ? "bg-primary text-white"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Duration</p>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${
                      selectedDuration === duration.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted bg-muted/30 hover:border-primary/50"
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep("date")}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                ← Back
              </Button>
              <Button
                onClick={() => setStep("details")}
                disabled={!canProceedToDetails}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step: Details */}
        {step === "details" && (
          <div className="space-y-4 py-4">
            <h3 className="font-bold text-foreground text-lg">Your contact information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-11 border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-primary/20 focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Notes (Optional)</label>
                <textarea
                  placeholder="Any special requests or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none bg-white/50 dark:bg-slate-900/50 resize-none h-24"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep("time")}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                ← Back
              </Button>
              <Button
                onClick={() => setStep("confirm")}
                disabled={!canConfirm}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl"
              >
                Review →
              </Button>
            </div>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4 py-4">
            <h3 className="font-bold text-foreground text-lg">Confirm your booking</h3>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/50 flex items-center justify-center">
                    <span className="text-xl">{shop.category.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{shop.name}</p>
                    <p className="text-sm text-muted-foreground">{shop.category}</p>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-semibold">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-semibold">{DURATIONS.find(d => d.value === selectedDuration)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="font-semibold">{name}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  You'll receive a confirmation email at <strong>{email}</strong> with all the details and a reminder 24 hours before your appointment.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep("details")}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                ← Back
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl"
              >
                {isSubmitting ? "Processing..." : "✓ Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedShopBooking;
