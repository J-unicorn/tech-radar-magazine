import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, Eye, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockData, getItemById, getKindLabel, formatViews } from "@/data/mockData";
import { useState } from "react";
import { FeedCard } from "@/components/FeedCard";

export default function CollectionDetail() {
  const { id } = useParams<{ id: string }>();
  const collection = mockData.layout.collections.find(c => c.id === id);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isCollectionBookmarked, setIsCollectionBookmarked] = useState(false);

  const toggleBookmark = (itemId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">컬렉션을 찾을 수 없습니다</h1>
          <Link to="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const items = collection.itemIds.map(id => getItemById(id)).filter(Boolean);
  const totalViews = items.reduce((acc, item) => acc + (item?.statsMock.views || 0), 0);
  const totalLikes = items.reduce((acc, item) => acc + (item?.statsMock.likes || 0), 0);
  const totalComments = items.reduce((acc, item) => acc + (item?.statsMock.comments || 0), 0);
  const firstItem = items[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16 max-w-4xl mx-auto">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">뒤로가기</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={isCollectionBookmarked ? "text-primary" : "text-muted-foreground"}
              onClick={() => setIsCollectionBookmarked(!isCollectionBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isCollectionBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto container-padding py-8">
        {/* Cover */}
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-muted mb-6">
          <img
            src={firstItem?.thumb || "https://placehold.co/800x400?text=Collection"}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white/80 text-sm mb-2">{collection.subtitle}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {collection.title}
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 p-4 bg-muted rounded-xl">
          <span className="text-sm font-medium text-foreground">
            {items.length}개 콘텐츠
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            {formatViews(totalViews)}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Heart className="w-4 h-4" />
            {formatViews(totalLikes)}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            {totalComments}
          </span>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => item && (
            <FeedCard
              key={item.id}
              item={item}
              isBookmarked={bookmarkedIds.has(item.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
