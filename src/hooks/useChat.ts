import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: "customer" | "business";
  content: string;
  message_type: "text" | "enquiry" | "auto_reply";
  enquiry_type: string | null;
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  id: string;
  customer_id: string;
  business_id: string;
  last_message_at: string;
  created_at: string;
  business_profiles?: {
    id: string;
    business_name: string;
    logo_url: string | null;
    category: string;
  };
}

export const useChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all conversations for the current user
  const fetchConversations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          business_profiles (
            id,
            business_name,
            logo_url,
            category
          )
        `)
        .order("last_message_at", { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get or create a conversation with a business
  const getOrCreateConversation = async (businessId: string): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to send enquiries",
        variant: "destructive",
      });
      return null;
    }

    try {
      // First try to find existing conversation
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("customer_id", user.id)
        .eq("business_id", businessId)
        .maybeSingle();

      if (existing) {
        return existing.id;
      }

      // Create new conversation
      const { data: newConversation, error } = await supabase
        .from("conversations")
        .insert({
          customer_id: user.id,
          business_id: businessId,
        })
        .select("id")
        .single();

      if (error) throw error;
      return newConversation.id;
    } catch (error: any) {
      console.error("Error getting/creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to start conversation",
        variant: "destructive",
      });
      return null;
    }
  };

  // Send a message
  const sendMessage = async (
    conversationId: string,
    content: string,
    messageType: "text" | "enquiry" | "auto_reply" = "text",
    enquiryType?: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        sender_type: "customer",
        content,
        message_type: messageType,
        enquiry_type: enquiryType,
      });

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return false;
    }
  };

  // Send enquiry with notification
  const sendEnquiry = async (
    businessId: string,
    businessName: string,
    enquiryType: string,
    enquiryMessage: string
  ): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to send enquiries",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Get or create conversation
      const conversationId = await getOrCreateConversation(businessId);
      if (!conversationId) return false;

      // Send the enquiry message
      const success = await sendMessage(conversationId, enquiryMessage, "enquiry", enquiryType);
      if (!success) return false;

      // Get business owner user_id for notification
      const { data: business } = await supabase
        .from("business_profiles")
        .select("user_id")
        .eq("id", businessId)
        .single();

      if (business) {
        // Create notification for business owner
        await supabase.from("notifications").insert({
          user_id: business.user_id,
          title: `New Enquiry: ${enquiryType}`,
          message: `You have a new ${enquiryType} enquiry from a customer`,
          type: "enquiry",
          reference_id: conversationId,
        });
      }

      return true;
    } catch (error: any) {
      console.error("Error sending enquiry:", error);
      return false;
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId: string): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      
      // Cast the data to Message[] type
      return (data || []).map(msg => ({
        ...msg,
        sender_type: msg.sender_type as "customer" | "business",
        message_type: msg.message_type as "text" | "enquiry" | "auto_reply",
      }));
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // Subscribe to new messages in a conversation
  const subscribeToMessages = (
    conversationId: string,
    onNewMessage: (message: Message) => void
  ) => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const rawMsg = payload.new as any;
          const msg: Message = {
            ...rawMsg,
            sender_type: rawMsg.sender_type as "customer" | "business",
            message_type: rawMsg.message_type as "text" | "enquiry" | "auto_reply",
          };
          onNewMessage(msg);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Mark messages as read
  const markMessagesAsRead = async (conversationId: string) => {
    if (!user) return;

    try {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  return {
    conversations,
    loading,
    fetchConversations,
    getOrCreateConversation,
    sendMessage,
    sendEnquiry,
    fetchMessages,
    subscribeToMessages,
    markMessagesAsRead,
  };
};

export default useChat;
