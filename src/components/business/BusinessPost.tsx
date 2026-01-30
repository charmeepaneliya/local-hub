import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, Video, X, Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

export interface BusinessPost {
  id: string;
  shopName: string;
  shopImage: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnail?: string;
  price?: string;
  discount?: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: Date;
  hasLiked?: boolean;
}

interface BusinessPostModalProps {
  open: boolean;
  onClose: () => void;
  onPost: (post: Omit<BusinessPost, "id" | "timestamp" | "likes" | "comments" | "shopName" | "shopImage">) => void;
  shopName: string;
  shopImage: string;
}

export const BusinessPostModal = ({
  open,
  onClose,
  onPost,
  shopName,
  shopImage,
}: BusinessPostModalProps) => {
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [preview, setPreview] = useState<string>("");

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setMediaUrl(url);
    if (url) {
      setPreview(url);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !mediaUrl.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    onPost({
      title,
      description,
      mediaType,
      mediaUrl,
      price: price || undefined,
      discount: discount || undefined,
      tags,
      thumbnail: mediaType === "video" ? preview : undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setPrice("");
    setDiscount("");
    setTags([]);
    setTagInput("");
    setPreview("");
    onClose();
    toast.success("Post published successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Share Your Products
          </DialogTitle>
          <DialogDescription>Post your latest products, offers & videos to attract customers</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <div className="space-y-6 pr-4">
            {/* Shop Info */}
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-primary/10">
              <img src={shopImage} alt={shopName} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-semibold text-foreground">{shopName}</p>
                <p className="text-sm text-muted-foreground">Create engaging post</p>
              </div>
            </div>

            {/* Media Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Content Type</label>
              <div className="flex gap-3">
                {[
                  { type: "image" as const, icon: ImagePlus, label: "Image" },
                  { type: "video" as const, icon: Video, label: "Video" },
                ].map(({ type, icon: Icon, label }) => (
                  <Button
                    key={type}
                    variant={mediaType === type ? "default" : "outline"}
                    className={`flex-1 gap-2 transition-all ${
                      mediaType === type
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                        : "border-primary/30 hover:border-primary"
                    }`}
                    onClick={() => setMediaType(type)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Media URL Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                {mediaType === "image" ? "Image URL" : "Video URL / Embed Link"}
              </label>
              <Input
                placeholder={
                  mediaType === "image"
                    ? "Paste image URL (jpg, png)..."
                    : "Paste video URL (YouTube, Vimeo, etc)..."
                }
                value={mediaUrl}
                onChange={handleMediaChange}
                className="border-primary/20 focus:border-primary bg-white/50 dark:bg-slate-900/50"
              />
              {preview && (
                <div className="mt-3 rounded-lg overflow-hidden border-2 border-primary/20 aspect-video bg-slate-900">
                  {mediaType === "image" ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <iframe
                      src={preview}
                      title="Video preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  )}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Product Title</label>
              <Input
                placeholder="Enter product name or title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-primary/20 focus:border-primary bg-white/50 dark:bg-slate-900/50"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Description</label>
              <textarea
                placeholder="Describe your product, special offers, and what makes it special..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-24 p-3 border border-primary/20 rounded-lg bg-white/50 dark:bg-slate-900/50 focus:border-primary focus:outline-none resize-none text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Price & Discount */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Price (Optional)</label>
                <Input
                  placeholder="₹ 999"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-primary/20 focus:border-primary bg-white/50 dark:bg-slate-900/50"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Discount (Optional)</label>
                <Input
                  placeholder="20% OFF"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="border-primary/20 focus:border-primary bg-white/50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tags (Hit Enter to add)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags like #sale, #new, #bestseller"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="border-primary/20 focus:border-primary bg-white/50 dark:bg-slate-900/50 flex-1"
                />
                <Button onClick={addTag} variant="outline" className="border-primary/20">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30 cursor-pointer hover:from-primary/30 hover:to-accent/30 transition-all flex items-center gap-1"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-3 mt-6 border-t border-primary/10 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1 border-primary/20">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all"
          >
            Publish Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface BusinessPostsListProps {
  posts: BusinessPost[];
  onLike: (postId: string) => void;
}

export const BusinessPostsList = ({ posts, onLike }: BusinessPostsListProps) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl overflow-hidden border border-primary/10 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
        >
          {/* Post Header */}
          <div className="p-4 flex items-center gap-3 border-b border-primary/10">
            <img
              src={post.shopImage}
              alt={post.shopName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{post.shopName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Post Media */}
          <div className="aspect-video bg-slate-900 overflow-hidden">
            {post.mediaType === "image" ? (
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <iframe
                src={post.mediaUrl}
                title={post.title}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>

          {/* Post Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-bold text-foreground text-lg">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
            </div>

            {/* Price & Discount */}
            {(post.price || post.discount) && (
              <div className="flex gap-3 items-center">
                {post.price && (
                  <span className="text-lg font-bold text-primary">₹ {post.price}</span>
                )}
                {post.discount && (
                  <Badge className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-600 dark:text-red-400 border-red-500/30">
                    {post.discount}
                  </Badge>
                )}
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-primary/10 flex items-center justify-between text-sm">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  post.hasLiked ? "fill-red-500 text-red-500" : "group-hover:fill-red-500/30"
                }`}
              />
              <span className="text-xs font-semibold">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <MessageCircle className="w-5 h-5 group-hover:fill-primary/20" />
              <span className="text-xs font-semibold">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
              <Share2 className="w-5 h-5 group-hover:fill-accent/20" />
              <span className="text-xs font-semibold">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
