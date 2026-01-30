import { useState } from "react";
import { Star, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  content: string;
  timestamp: Date;
  helpful: number;
}

interface ShopReviewProps {
  shopId: number;
  shopName: string;
  open: boolean;
  onClose: () => void;
  reviews?: Review[];
}

const reviewTitles = [
  "Great experience!",
  "Would recommend",
  "Very satisfied",
  "Amazing service",
  "Good value for money",
  "Friendly staff",
];

const ShopReview = ({ shopId, shopName, open, onClose, reviews = [] }: ShopReviewProps) => {
  const [step, setStep] = useState<"rating" | "review">("rating");
  const [selectedRating, setSelectedRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = () => {
    if (selectedRating > 0 && title && content && name) {
      setSubmitted(true);
      setTimeout(() => {
        handleReset();
        onClose();
      }, 2000);
    }
  };

  const handleReset = () => {
    setStep("rating");
    setSelectedRating(0);
    setTitle("");
    setContent("");
    setName("");
    setSubmitted(false);
    setHoverRating(0);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Reviews & Ratings</DialogTitle>
          <DialogDescription>{shopName}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-600">Thank you for your review!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your feedback helps us serve you better.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">{averageRating}</div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(Number(averageRating))
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 flex-1 ml-6">
                  {ratingDistribution.map(({ rating, count }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-xs font-medium w-6">{rating}★</span>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 transition-all"
                          style={{
                            width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add Review Section */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg mb-4">Share your experience</h3>

              {step === "rating" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">How would you rate this shop?</p>
                    <div className="flex gap-3 justify-center py-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(rating)}
                          onMouseEnter={() => setHoverRating(rating)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={40}
                            className={`${
                              (hoverRating || selectedRating) >= rating
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-muted-foreground"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedRating > 0 && (
                    <Button onClick={() => setStep("review")} className="w-full">
                      Continue
                    </Button>
                  )}
                </div>
              )}

              {step === "review" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your name</label>
                    <Input
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Review title</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {reviewTitles.map((t) => (
                        <Badge
                          key={t}
                          variant={title === t ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setTitle(t)}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Or write your own title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Your review</label>
                    <textarea
                      placeholder="Share your experience..."
                      className="w-full px-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setStep("rating")}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitReview}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={!name || !title || !content}
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Recent reviews</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{review.author}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-1">{review.title}</p>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                      {review.helpful > 0 && (
                        <p className="text-xs text-primary mt-2">👍 {review.helpful} found this helpful</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShopReview;
