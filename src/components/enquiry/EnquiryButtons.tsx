import { useState } from "react";
import { IndianRupee, Package, Truck, Clock, ShoppingCart, MessageCircle, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const enquiryOptions = [
  { 
    id: "price", 
    label: "Price?", 
    icon: IndianRupee, 
    emoji: "💰",
    message: "Hi! I want to know the price of this product/service.",
    color: "from-emerald-500 to-green-600"
  },
  { 
    id: "stock", 
    label: "Stock available?", 
    icon: Package, 
    emoji: "📦",
    message: "Hi! Is this item currently in stock?",
    color: "from-blue-500 to-indigo-600"
  },
  { 
    id: "delivery", 
    label: "Delivery available?", 
    icon: Truck, 
    emoji: "🚚",
    message: "Hi! Do you offer delivery for this item?",
    color: "from-purple-500 to-violet-600"
  },
  { 
    id: "time", 
    label: "Delivery time?", 
    icon: Clock, 
    emoji: "⏰",
    message: "Hi! What is the expected delivery time?",
    color: "from-orange-500 to-amber-600"
  },
  { 
    id: "order", 
    label: "Order Now", 
    icon: ShoppingCart, 
    emoji: "🛒",
    message: "Hi! I would like to place an order for this item.",
    color: "from-pink-500 to-rose-600"
  },
];

interface EnquiryButtonsProps {
  businessName: string;
  businessId?: string;
  variant?: "compact" | "full";
  onEnquiry?: (enquiryType: string, message: string) => void;
}

const EnquiryButtons = ({ businessName, businessId, variant = "full", onEnquiry }: EnquiryButtonsProps) => {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [sendingEnquiry, setSendingEnquiry] = useState<string | null>(null);
  const { toast } = useToast();
  const { sendEnquiry } = useChat();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnquiry = async (option: typeof enquiryOptions[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to send enquiries",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const fullMessage = `${option.message}\n\nRegarding: ${businessName}`;
    
    // If businessId is provided, send real enquiry to database
    if (businessId) {
      setSendingEnquiry(option.id);
      const success = await sendEnquiry(businessId, businessName, option.label, fullMessage);
      setSendingEnquiry(null);
      
      if (success) {
        toast({
          title: `${option.emoji} Enquiry Sent!`,
          description: `Your "${option.label}" enquiry has been sent to ${businessName}. They will respond soon!`,
        });
      }
    } else {
      // Fallback for demo/mock data without real businessId
      if (onEnquiry) {
        onEnquiry(option.id, fullMessage);
      }
      
      toast({
        title: `${option.emoji} Enquiry Sent!`,
        description: `Your "${option.label}" enquiry has been sent to ${businessName}. They will respond soon!`,
      });
    }
    
    setShowEnquiry(false);
  };

  if (variant === "compact") {
    return (
      <div className="relative">
        <Button
          size="sm"
          onClick={() => setShowEnquiry(!showEnquiry)}
          className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Enquire
        </Button>
        
        {showEnquiry && (
          <div className="absolute bottom-full left-0 mb-2 z-50 animate-scale-in">
            <div className="bg-card rounded-xl shadow-2xl border border-border p-3 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Quick Enquiry</span>
                <button 
                  onClick={() => setShowEnquiry(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1.5">
                {enquiryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleEnquiry(option)}
                    disabled={sendingEnquiry === option.id}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${option.color} hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50`}
                  >
                    {sendingEnquiry === option.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>{option.emoji}</span>
                    )}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 bg-gradient-to-r from-muted/50 to-muted/30 border-t border-border">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-foreground">Quick Enquiry</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {enquiryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleEnquiry(option)}
            disabled={sendingEnquiry === option.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${option.color} hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50`}
          >
            {sendingEnquiry === option.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="text-sm">{option.emoji}</span>
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnquiryButtons;
