import { useState } from "react";
import { Bell, Heart, Package, MessageSquare, AlertCircle, Zap, Trash2, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Notifications page with full notification management

interface Notification {
  id: string;
  type: "order" | "deal" | "message" | "system" | "booking" | "review";
  title: string;
  description: string;
  icon: React.ReactNode;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  image?: string;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Booking Confirmed!",
    description: "Your appointment at  on Jan 31 at 2:00 PM is confirmed.",
    icon: <Package className="w-6 h-6" />,
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    actionUrl: "/bookings",
  },
  {
    id: "2",
    type: "deal",
    title: "Flash Deal - 50% OFF!",
    description: "Summer Collection at Fashion Hub - Limited time offer ending in 2 hours",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: "3",
    type: "message",
    title: "New Message from Tech Paradise",
    description: "Your order #12345 is ready for pickup. Thank you for shopping!",
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    timestamp: new Date(Date.now() - 14400000),
    read: false,
  },
  {
    id: "4",
    type: "order",
    title: "Order Shipped!",
    description: "Your order from Beauty Glow has been shipped. Track it now.",
    icon: <Package className="w-6 h-6 text-green-500" />,
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: "5",
    type: "review",
    title: "Your Review Posted",
    description: "Your 5-star review of Fashion Hub was published successfully.",
    icon: <Heart className="w-6 h-6 text-red-500" />,
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "Account Security Alert",
    description: "New login detected from Chrome on Windows. If this wasn't you, secure your account.",
    icon: <AlertCircle className="w-6 h-6 text-red-500" />,
    timestamp: new Date(Date.now() - 259200000),
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread" | "orders" | "deals" | "messages">("all");
  const { toast } = useToast();

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (filter === "unread") {
      filtered = filtered.filter((n) => !n.read);
    } else if (filter === "orders") {
      filtered = filtered.filter((n) => ["order", "booking", "package"].includes(n.type));
    } else if (filter === "deals") {
      filtered = filtered.filter((n) => n.type === "deal");
    } else if (filter === "messages") {
      filtered = filtered.filter((n) => n.type === "message");
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({ description: "All notifications marked as read" });
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({ description: "Notification deleted" });
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast({ description: "All notifications deleted" });
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
      case "booking":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
      case "deal":
        return "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800";
      case "message":
        return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
      case "review":
        return "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800";
      case "system":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
      default:
        return "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl relative">
              <Bell className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Notifications</h1>
              <p className="text-slate-600 dark:text-slate-300">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Mark All Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAll}
                className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <Bell className="w-12 h-12 text-slate-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Notifications
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You're all caught up! We'll notify you when something interesting happens.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl p-4 border transition-all duration-300 ${getNotificationColor(
                  notification.type
                )} ${!notification.read ? "shadow-md" : "opacity-75"} hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 pt-1">{notification.icon}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>

                      {/* Unread Badge */}
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs px-2 h-7 text-primary hover:bg-primary/10"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      {notification.actionUrl && (
                        <Button
                          size="sm"
                          className="text-xs px-2 h-7 bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          View
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs px-2 h-7 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredNotifications.length === 0 && notifications.length > 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No notifications match your filter
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
