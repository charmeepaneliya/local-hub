import { useState } from "react";
import { X, Calendar, Clock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingModalProps {
  business: {
    id: number;
    name: string;
    category: string;
    image: string;
  } | null;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const services = [
  { name: "Standard Appointment", duration: "30 min", price: "$25" },
  { name: "Extended Consultation", duration: "60 min", price: "$45" },
  { name: "Premium Service", duration: "90 min", price: "$70" },
];

const BookingModal = ({ business, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!business) return null;

  const handleSubmit = () => {
    setStep(4); // Success step
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto card-shadow animate-scale-in">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={business.image}
              alt={business.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-semibold text-foreground">{business.name}</h2>
              <p className="text-sm text-muted-foreground">{business.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s
                      ? "gradient-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      step > s ? "gradient-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Service</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedService === service.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <span className="font-semibold text-primary">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                className="w-full mt-6 gradient-primary text-primary-foreground border-0"
                disabled={!selectedService}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Date & Time</h3>
              
              <div className="mb-6">
                <Label className="text-foreground mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date
                </Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-secondary border-0"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label className="text-foreground mb-2 block">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 gradient-primary text-primary-foreground border-0"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground mb-2 block">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-secondary border-0"
                  />
                </div>
                <div>
                  <Label className="text-foreground mb-2 block">Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone"
                    className="bg-secondary border-0"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Service: {selectedService}</p>
                  <p>Date: {selectedDate}</p>
                  <p>Time: {selectedTime}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 gradient-primary text-primary-foreground border-0"
                  disabled={!name || !phone}
                  onClick={handleSubmit}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="animate-scale-in text-center py-8">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                Your appointment at {business.name} has been booked for {selectedDate} at {selectedTime}.
              </p>
              <Button onClick={onClose} className="gradient-primary text-primary-foreground border-0">
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
