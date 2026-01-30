import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Eye, EyeOff, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const businessCategories = [
  { value: "shop", label: "Shop" },
  { value: "retail_shop", label: "Retail Shop" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "small_business", label: "Small Business" },
  { value: "appointment_service", label: "Book Appointments" },
];

const Signup = () => {
  const [accountType, setAccountType] = useState<"customer" | "business">("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Business fields
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim() || !fullName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    if (accountType === "business" && (!businessName.trim() || !category || !area.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all business details",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName.trim(),
          account_type: accountType,
        },
      },
    });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // If business account, create business profile
    if (accountType === "business" && data.user) {
      const { error: businessError } = await supabase
        .from("business_profiles")
        .insert({
          user_id: data.user.id,
          business_name: businessName.trim(),
          category: category as "shop" | "retail_shop" | "wholesaler" | "small_business" | "appointment_service",
          area: area.trim(),
        });

      if (businessError) {
        console.error("Business profile error:", businessError);
        toast({
          title: "Warning",
          description: "Account created but business profile setup failed. Please update later.",
          variant: "destructive",
        });
      }
    }

    toast({
      title: "Account Created!",
      description: "Welcome to LocalHub!",
    });
    navigate("/");
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join LocalHub today</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Account Type Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              className={`p-4 rounded-xl border-2 transition-all ${
                accountType === "customer"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <User className={`w-6 h-6 mx-auto mb-2 ${accountType === "customer" ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-sm font-medium ${accountType === "customer" ? "text-primary" : "text-foreground"}`}>
                Customer
              </p>
              <p className="text-xs text-muted-foreground mt-1">Browse & shop</p>
            </button>
            <button
              type="button"
              onClick={() => setAccountType("business")}
              className={`p-4 rounded-xl border-2 transition-all ${
                accountType === "business"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Building2 className={`w-6 h-6 mx-auto mb-2 ${accountType === "business" ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-sm font-medium ${accountType === "business" ? "text-primary" : "text-foreground"}`}>
                Business
              </p>
              <p className="text-xs text-muted-foreground mt-1">List your shop</p>
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Business Fields */}
            {accountType === "business" && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">Business Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business category" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="area">Area / Location *</Label>
                  <Input
                    id="area"
                    placeholder="Enter your area or location"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full gradient-primary" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
