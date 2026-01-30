import { useState } from "react";
import Header from "@/components/layout/Header";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, ArrowLeft, Loader2, Store } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { user } = useAuth();
  const { 
    conversations, 
    loading, 
    fetchMessages, 
    sendMessage, 
    subscribeToMessages,
    markMessagesAsRead 
  } = useChat();
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConvo = conversations.find(c => c.id === selectedConversation);

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setLoadingMessages(true);
      fetchMessages(selectedConversation).then((msgs) => {
        setMessages(msgs);
        setLoadingMessages(false);
        markMessagesAsRead(selectedConversation);
      });

      // Subscribe to new messages
      const unsubscribe = subscribeToMessages(selectedConversation, (newMsg) => {
        setMessages(prev => [...prev, newMsg]);
        if (newMsg.sender_id !== user?.id) {
          markMessagesAsRead(selectedConversation);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setSendingMessage(true);
    const success = await sendMessage(selectedConversation, newMessage.trim());
    if (success) {
      setNewMessage("");
    }
    setSendingMessage(false);
  };

  const getEnquiryBadge = (enquiryType: string | null) => {
    if (!enquiryType) return null;
    
    const badges: Record<string, { emoji: string; color: string }> = {
      "Price pucho": { emoji: "💰", color: "bg-emerald-500" },
      "Stock available?": { emoji: "📦", color: "bg-blue-500" },
      "Delivery available?": { emoji: "🚚", color: "bg-purple-500" },
      "Delivery time?": { emoji: "⏰", color: "bg-orange-500" },
      "Order Now": { emoji: "🛒", color: "bg-pink-500" },
    };

    const badge = badges[enquiryType];
    if (!badge) return null;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white ${badge.color} mb-1`}>
        {badge.emoji} {enquiryType}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground mb-4">Please login to view your messages</p>
          <Button onClick={() => window.location.href = "/login"}>Login</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-xl card-shadow overflow-hidden h-[calc(100vh-180px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full md:w-80 border-r border-border flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-border">
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Messages
                </h1>
              </div>
              
              <ScrollArea className="flex-1">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <Store className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">No conversations yet</p>
                    <p className="text-muted-foreground text-xs mt-1">Send an enquiry to start chatting!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {conversations.map((convo) => (
                      <button
                        key={convo.id}
                        onClick={() => setSelectedConversation(convo.id)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                          selectedConversation === convo.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {convo.business_profiles?.logo_url ? (
                            <img 
                              src={convo.business_profiles.logo_url} 
                              alt={convo.business_profiles.business_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Store className="w-6 h-6 text-primary" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">
                              {convo.business_profiles?.business_name || 'Business'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {convo.business_profiles?.category || 'Shop'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(convo.last_message_at), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              {selectedConversation && selectedConvo ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    {selectedConvo.business_profiles?.logo_url ? (
                      <img 
                        src={selectedConvo.business_profiles.logo_url} 
                        alt={selectedConvo.business_profiles.business_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedConvo.business_profiles?.business_name || 'Business'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedConvo.business_profiles?.category || 'Shop'}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {loadingMessages ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No messages yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                msg.sender_id === user.id
                                  ? 'bg-primary text-primary-foreground rounded-br-md'
                                  : 'bg-muted text-foreground rounded-bl-md'
                              }`}
                            >
                              {msg.message_type === 'enquiry' && getEnquiryBadge(msg.enquiry_type)}
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.sender_id === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {format(new Date(msg.created_at), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!newMessage.trim() || sendingMessage}
                        className="gradient-primary"
                      >
                        {sendingMessage ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
