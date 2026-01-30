import { Calendar, MessageCircle, Tag, Store, X, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface NotificationsDropdownProps {
  onClose: () => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "booking":
      return Calendar;
    case "enquiry":
      return ShoppingCart;
    case "message":
      return MessageCircle;
    default:
      return Store;
  }
};

const getNotificationStyle = (type: string) => {
  switch (type) {
    case "booking":
      return "bg-primary/10 text-primary";
    case "enquiry":
      return "bg-warning/10 text-warning";
    case "message":
      return "bg-success/10 text-success";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const { notifications, loading, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const handleNotificationClick = async (notificationId: string, referenceId: string | null) => {
    await markAsRead(notificationId);
    if (referenceId) {
      // Navigate to messages if it's a conversation reference
      onClose();
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-card rounded-lg border border-border card-shadow animate-scale-in z-50">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 px-4">
            <MessageCircle className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <Link
                key={notification.id}
                to={notification.reference_id ? "/messages" : "#"}
                onClick={() => handleNotificationClick(notification.id, notification.reference_id)}
                className={`flex gap-3 p-4 hover:bg-secondary/50 cursor-pointer transition-colors border-b border-border last:border-0 ${
                  !notification.is_read ? "bg-primary/5" : ""
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationStyle(notification.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm text-foreground truncate">
                      {notification.title}
                    </p>
                    {!notification.is_read && (
                      <span className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-border">
        <Button asChild variant="ghost" className="w-full text-sm text-primary">
          <Link to="/messages" onClick={onClose}>View all messages</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
