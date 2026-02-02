import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bell, BellOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockData, getItemById } from "@/data/mockData";
import { useState } from "react";
import { FeedCard } from "@/components/FeedCard";

export default function CreatorDetail() {
  const { id } = useParams<{ id: string }>();
  const creator = mockData.layout.creators.find(c => c.id === id);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">크리에이터를 찾을 수 없습니다</h1>
          <Link to="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const items = creator.topItemIds.map(id => getItemById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-padding">
          <div className="flex items-center h-16 max-w-4xl mx-auto">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">뒤로가기</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto container-padding py-8">
        {/* Creator Info */}
        <div className="flex items-start gap-6 mb-8 p-6 bg-muted rounded-2xl">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-primary" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">{creator.name}</h1>
            <p className="text-muted-foreground mb-4">{creator.tagline}</p>
            <Button
              variant={isSubscribed ? "secondary" : "default"}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? (
                <>
                  <BellOff className="w-4 h-4 mr-2" />
                  알림 끄기
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  알림 받기
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Items */}
        <h2 className="text-xl font-bold text-foreground mb-4">주요 콘텐츠</h2>
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
