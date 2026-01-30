import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! 👋 I'm your LocalHub assistant. How can I help you today? I can help you find local businesses, book appointments, or answer questions about services in your area.",
    isBot: true,
    time: "Just now",
  },
];

const quickReplies = [
  "Find restaurants nearby",
  "Book a haircut",
  "Show promotions",
  "Contact support",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      time: "Just now",
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
        time: "Just now",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("restaurant") || lowerQuery.includes("food") || lowerQuery.includes("eat")) {
      return "🍽️ I found several great restaurants near you! Mario's Italian Kitchen has a 4.8 rating and is offering 20% off today. Would you like me to book a table?";
    }
    if (lowerQuery.includes("haircut") || lowerQuery.includes("salon") || lowerQuery.includes("hair")) {
      return "💇 Style Studio has availability today! They're highly rated (4.9★) and located just 0.3 miles away. Would you like to book an appointment?";
    }
    if (lowerQuery.includes("promo") || lowerQuery.includes("deal") || lowerQuery.includes("discount")) {
      return "🏷️ Great deals near you today:\n• Mario's Pizza: 20% off all pizzas\n• Style Studio: Free styling with any cut\n• Zen Yoga: First class free\n\nWant details on any of these?";
    }
    if (lowerQuery.includes("doctor") || lowerQuery.includes("clinic") || lowerQuery.includes("health")) {
      return "🏥 Dr. Smith's Clinic has appointments available. They offer general consultations and specialized care. Should I show you their available time slots?";
    }
    
    return "I'd be happy to help you with that! You can browse local businesses in the Explore section, or tell me more specifically what you're looking for - restaurants, salons, clinics, or any other service.";
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => {
      const userMessage: Message = {
        id: messages.length + 1,
        text: reply,
        isBot: false,
        time: "Just now",
      };
      setMessages([...messages, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getBotResponse(reply),
          isBot: true,
          time: "Just now",
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }, 100);
    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary text-primary-foreground card-shadow hover:card-shadow-hover transition-all animate-float z-40 flex items-center justify-center ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[520px] bg-card rounded-2xl card-shadow border border-border z-50 flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="gradient-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">LocalHub AI</h3>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.isBot
                      ? "gradient-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.isBot
                      ? "bg-secondary text-secondary-foreground rounded-tl-sm"
                      : "gradient-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-secondary border-0"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                size="icon"
                className="gradient-primary text-primary-foreground border-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
