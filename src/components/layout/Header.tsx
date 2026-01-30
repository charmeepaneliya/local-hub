import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Menu, X, MapPin, User, LogOut, MessageCircle, Home, Compass, Bookmark, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import NotificationsDropdown from "@/components/notifications/NotificationsDropdown";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Bookings", href: "/bookings", icon: Bookmark },
    { label: "Messages", href: "/messages", icon: MessageCircle, requireAuth: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border card-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">LocalHub</span>
          </Link>

          {/* Search - Desktop */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search shops, services..."
                className="pl-10 bg-secondary border-0 focus-visible:ring-primary rounded-xl"
              />
            </div>
          </div> */}

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href, requireAuth, icon: Icon }) => {
              if (requireAuth && !user) return null;
              return (
                <Button key={href} asChild variant="ghost" className="text-foreground hover:bg-secondary rounded-lg">
                  <Link to={href} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                </Button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {user && (
              <div className="relative hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-lg"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
                {notificationsOpen && (
                  <NotificationsDropdown onClose={() => setNotificationsOpen(false)} />
                )}
              </div>
            )}

            <Button asChild className="hidden sm:flex gradient-primary text-primary-foreground border-0 rounded-xl font-medium">
              <Link to="/signup">List Business</Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                    <span className="font-semibold text-foreground">{user.user_metadata?.full_name || "User"}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer rounded-lg" asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-3 text-primary" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-lg" asChild>
                    <Link to="/saved" className="flex items-center">
                      <Bookmark className="w-4 h-4 mr-3 text-accent" />
                      <span>Saved Items</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-lg">
                    <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer rounded-lg text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="gradient-primary text-primary-foreground border-0 rounded-xl font-medium">
                <Link to="/login">Sign In</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border/50 animate-slide-up">
            <div className="relative mt-4 mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-secondary border-0 rounded-xl focus-visible:ring-primary"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <Button 
                  key={href}
                  asChild 
                  variant="ghost" 
                  className="justify-start rounded-lg text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to={href} className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                </Button>
              ))}
              {!user && (
                <>
                  <Button asChild variant="ghost" className="justify-start rounded-lg">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="mt-2 gradient-primary text-primary-foreground border-0 rounded-xl font-medium">
                    <Link to="/signup">List Business</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
