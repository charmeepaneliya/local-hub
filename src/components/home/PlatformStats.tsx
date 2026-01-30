import { TrendingUp, Users, Store, Award, Zap } from "lucide-react";

const STATS = [
  {
    icon: Store,
    label: "Active Shops",
    value: "2,500+",
    description: "Verified local businesses",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    label: "Happy Customers",
    value: "50K+",
    description: "Users connected daily",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: TrendingUp,
    label: "Transactions",
    value: "100K+",
    description: "Completed monthly",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Award,
    label: "Avg Rating",
    value: "4.8⭐",
    description: "Customer satisfaction",
    color: "from-orange-500 to-orange-600",
  },
];

export const PlatformStats = () => {
  return (
    <section className="mb-14 py-14 px-4">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-4 bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-full">
          <Award className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Why Choose Us?</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Why Choose Local Connect Hub?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join thousands of satisfied customers & thriving businesses building their success locally</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map(({ icon: Icon, label, value, description, color }, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${color} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group`}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Animated Background Blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Label */}
              <p className="text-white/90 text-sm font-semibold mb-2 group-hover:text-white transition-colors">{label}</p>
              
              {/* Value */}
              <p className="text-4xl font-black text-white mb-3 tracking-tight">{value}</p>
              
              {/* Description */}
              <p className="text-white/75 text-xs font-medium group-hover:text-white/90 transition-colors">{description}</p>
            </div>

            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
};
