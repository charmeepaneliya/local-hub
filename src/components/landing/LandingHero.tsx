import { Sparkles, CheckCircle, Users, Zap } from "lucide-react";

const LandingHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Discover Your Neighborhood</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gradient">
              Connect with Local Businesses
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Find shops, restaurants, services, and wholesalers near you. Book appointments, make purchases, and support local businesses all in one app.
            </p>

            {/* Features List */}
            <div className="space-y-4 mt-8">
              {[
                { icon: Zap, title: "Fast & Easy", desc: "Quick searches and instant bookings" },
                { icon: Users, title: "Community", desc: "Connect with local vendors" },
                { icon: CheckCircle, title: "Verified", desc: "Trusted and reviewed businesses" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow">
                    <feature.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Illustration */}
          <div className="relative h-80 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏬</div>
                <p className="text-foreground font-semibold">Explore Your Area</p>
                <p className="text-sm text-muted-foreground">Browse hundreds of local businesses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
