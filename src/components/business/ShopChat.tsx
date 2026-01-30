import { useState, useRef, useEffect } from "react";
import { Send, X, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShopData } from "./ShopCard";

interface ShopChatMessage {
  id: string;
  text: string;
  sender: "user" | "shop";
  timestamp: Date;
  read: boolean;
}

interface ShopChatProps {
  shop: ShopData;
  open: boolean;
  onClose: () => void;
}

const quickMessages = [
  "What's your price?",
  "Do you have stock?",
  "When can I visit?",
  "How long is delivery?",
  "Do you offer discounts?",
];

const ShopChat = ({ shop, open, onClose }: ShopChatProps) => {
  const [messages, setMessages] = useState<ShopChatMessage[]>([
    {
      id: "1",
      text: `Hi! Thanks for contacting ${shop.name}. How can we help you today?`,
      sender: "shop",
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ShopChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate shop response
    setTimeout(() => {
      const shopResponses: Record<string, string> = {
        price: `Our products range from $${Math.floor(Math.random() * 100) + 20} to $${Math.floor(Math.random() * 500) + 200}. What specific product are you interested in?`,
        stock: `Yes, we have most items in stock! Current availability is great. Would you like to place an order?`,
        visit: `We're open today until ${shop.hours.split("-")[1].trim()}. You're welcome to visit anytime! We're located at ${shop.distance} away.`,
        delivery: `We typically deliver within 2-3 business days. For urgent orders, express delivery is available for an additional fee.`,
        discount: `We offer special discounts for bulk orders and regular customers! Ask about our loyalty program.`,
        default: `Thanks for your interest! We'd love to help. Can you tell us more about what you're looking for?`,
      };

      let response = shopResponses.default;
      const textLower = text.toLowerCase();

      if (textLower.includes("price") || textLower.includes("cost")) {
        response = shopResponses.price;
      } else if (textLower.includes("stock")) {
        response = shopResponses.stock;
      } else if (textLower.includes("visit") || textLower.includes("open")) {
        response = shopResponses.visit;
      } else if (textLower.includes("delivery")) {
        response = shopResponses.delivery;
      } else if (textLower.includes("discount")) {
        response = shopResponses.discount;
      }

      const shopMessage: ShopChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "shop",
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => [...prev, shopMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center md:justify-end">
      <div className="bg-card w-full md:w-[420px] h-[600px] md:h-[700px] rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-3xl md:rounded-t-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{shop.name}</h3>
              <p className="text-sm opacity-90">{shop.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Shop Info Bar */}
          <div className="flex gap-3 text-xs opacity-90">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{shop.hours}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{shop.distance}</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Quick Messages */}
        {messages.length < 3 && (
          <div className="px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Quick messages:</p>
            <div className="flex flex-wrap gap-2">
              {quickMessages.slice(0, 3).map((msg, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSendMessage(msg)}
                >
                  {msg}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            className="rounded-full"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="rounded-full"
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopChat;
export type { ShopChatMessage };
