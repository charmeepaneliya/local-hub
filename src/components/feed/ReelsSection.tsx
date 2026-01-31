import { useState } from "react";
import { Plus, Play, X, MessageCircle, Check, UserPlus } from "lucide-react";
import EnquiryButtons from "@/components/enquiry/EnquiryButtons";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/hooks/useFollow";

interface Story {
  id: number;
  userId?: string;
  businessName: string;
  businessImage: string;
  hasUnwatched: boolean;
  category: string;
  reelImage?: string;
  productName?: string;
}

const allStories: Story[] = [
  { id: 0, userId: "u1", businessName: "Your Story", businessImage: "", hasUnwatched: false, category: "All" },
  { id: 1, userId: "u2", businessName: "Fashion Hub", businessImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop", hasUnwatched: true, category: "Shops", reelImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=700&fit=crop", productName: "Winter Collection 30% OFF" },
  { id: 2, userId: "u3", businessName: "Tech World", businessImage: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=100&h=100&fit=crop", hasUnwatched: true, category: "Shops", reelImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=700&fit=crop", productName: "Latest Smartphones" },
  { id: 3, userId: "u3", businessName: "Textile Mart", businessImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop", hasUnwatched: true, category: "Wholesalers", reelImage: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=700&fit=crop", productName: "Bulk Fabric Orders" },
  { id: 4, userId: "u4", businessName: "Spice Traders", businessImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop", hasUnwatched: false, category: "Wholesalers", reelImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=700&fit=crop", productName: "Premium Spices" },
  { id: 5, userId: "u4", businessName: "Handmade Crafts", businessImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=100&h=100&fit=crop", hasUnwatched: true, category: "Small Business", reelImage: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=400&h=700&fit=crop", productName: "Handcrafted Items" },
  { id: 6, userId: "u4", businessName: "Home Bakery", businessImage: "https://images.pexels.com/photos/10907000/pexels-photo-10907000.jpeg", hasUnwatched: true, category: "Small Business", reelImage: "https://images.pexels.com/photos/10907000/pexels-photo-10907000.jpeg?w=400&h=700&fit=crop", productName: "Fresh Cakes Daily" },
  { id: 7, userId: "u2", businessName: "Style Studio", businessImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop", hasUnwatched: true, category: "Salons", reelImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=700&fit=crop", productName: "Hair Makeover" },
  { id: 8, userId: "u2", businessName: "Dr. Smith", businessImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop", hasUnwatched: false, category: "Health", reelImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=700&fit=crop", productName: "Health Checkups" },
  { id: 9, userId: "u4", businessName: "Mario's Kitchen", businessImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop", hasUnwatched: true, category: "Restaurants", reelImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=700&fit=crop", productName: "Fresh Pizza" },
  { id: 10, userId: "u3", businessName: "Zen Yoga", businessImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop", hasUnwatched: true, category: "Appointments", reelImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=700&fit=crop", productName: "Morning Yoga Sessions" },
];

interface ReelsSectionProps {
  activeCategory?: string;
}

const ReelsSection = ({ activeCategory = "All" }: ReelsSectionProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const { user: authUser } = useAuth();
  const currentUserId = authUser?.id ?? "u1";
  const { isFollowing, toggleFollow } = useFollow();
  
  const filteredStories = allStories.filter(story => 
    story.id === 0 || activeCategory === "All" || story.category === activeCategory
  );

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-accent" />
          {activeCategory === "All" ? "Reels & Stories" : `${activeCategory} Stories`}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {filteredStories.map((story) => (
            <button
              key={story.id}
              onClick={() => story.id !== 0 && setSelectedStory(story)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div
                className={`relative w-16 h-16 rounded-full p-0.5 ${
                  story.id === 0
                    ? "bg-secondary"
                    : story.hasUnwatched
                    ? "bg-gradient-to-br from-primary via-accent to-warning"
                    : "bg-muted"
                }`}
              >
                <div className="w-full h-full rounded-full bg-card p-0.5">
                  {story.id === 0 ? (
                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                  ) : (
                    <img
                      src={story.businessImage}
                      alt={story.businessName}
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                {story.hasUnwatched && story.id !== 0 && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full border-2 border-card flex items-center justify-center">
                    <Play className="w-2 h-2 text-accent-foreground fill-accent-foreground" />
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground truncate w-16 text-center group-hover:text-foreground transition-colors">
                {story.businessName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story/Reel Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in">
          <div className="relative w-full max-w-sm mx-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Story Content */}
            <div className="relative rounded-2xl overflow-hidden bg-card shadow-2xl">
              {/* Progress Bar */}
              <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded-full z-10">
                <div className="h-full bg-white rounded-full animate-[progress_5s_linear]" style={{ width: '100%' }} />
              </div>

                          {/* Header */}
              <div className="absolute top-6 left-3 right-3 flex items-center gap-3 z-10">
                <img
                  src={selectedStory.businessImage}
                  alt={selectedStory.businessName}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{selectedStory.businessName}</p>
                  <p className="text-white/70 text-xs">{selectedStory.category}</p>
                </div>

                {/* follow button in reel viewer */}
                {selectedStory.userId !== currentUserId && (
                  <button
                    onClick={() => toggleFollow(selectedStory.userId)}
                    className="ml-2 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-[1.03] shadow-sm"
                    title={isFollowing(selectedStory.userId) ? `Following ${selectedStory.businessName}` : `Follow ${selectedStory.businessName}`}
                    style={isFollowing(selectedStory.userId) ? { background: '#f3f4f6', color: '#065f46', border: '1px solid rgba(15,23,42,0.06)' } : { background: '#14b8a6', color: '#fff' }}
                  >
                    {isFollowing(selectedStory.userId) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Image */}
              <img
                src={selectedStory.reelImage}
                alt={selectedStory.productName}
                className="w-full aspect-[9/16] object-cover"
              />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-20">
                <p className="text-white font-bold text-lg mb-3">{selectedStory.productName}</p>
                
                {/* Enquiry Buttons in Reel */}
                <EnquiryButtons businessName={selectedStory.businessName} variant="compact" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReelsSection;