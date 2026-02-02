import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Bookmark, Play, Clock, Eye, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getItemById, getChipById, getKindLabel, formatViews } from "@/data/mockData";
import { useState } from "react";

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const item = id ? getItemById(id) : undefined;
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">콘텐츠를 찾을 수 없습니다</h1>
          <Link to="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const getBadgeClass = (badge: string) => {
    const lower = badge.toLowerCase();
    if (lower === "hot") return "badge-hot";
    if (lower === "new") return "badge-new";
    if (lower === "추천") return "badge-recommend";
    if (lower === "인기") return "badge-popular";
    if (lower === "핵심") return "badge-core";
    if (lower === "입문") return "badge-intro";
    if (lower === "kor") return "badge-kor";
    return "bg-muted text-muted-foreground";
  };

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
              className={isBookmarked ? "text-primary" : "text-muted-foreground"}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto container-padding py-8">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-6">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.kind === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {getKindLabel(item.kind)}
          </Badge>
          {item.badges.map(badge => (
            <Badge key={badge} className={`text-xs ${getBadgeClass(badge)}`}>
              {badge}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span>{item.source}</span>
          <span>·</span>
          <span>{item.author}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {item.minutesMock}분
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            {formatViews(item.statsMock.views)} 조회
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Heart className="w-4 h-4" />
            {formatViews(item.statsMock.likes)} 좋아요
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            {item.statsMock.comments} 댓글
          </span>
        </div>

        {/* Summary */}
        <div className="p-6 bg-muted rounded-2xl mb-8">
          <h3 className="font-semibold text-foreground mb-2">요약</h3>
          <p className="text-muted-foreground">{item.summary}</p>
        </div>

        {/* Chips */}
        <div className="mb-8">
          <h3 className="font-semibold text-foreground mb-3">관련 태그</h3>
          <div className="flex flex-wrap gap-2">
            {item.chipIds.map(chipId => {
              const chip = getChipById(chipId);
              return chip ? (
                <span key={chipId} className="chip">
                  {chip.label}
                </span>
              ) : null;
            })}
          </div>
        </div>

        {/* CTA */}
        <Button asChild size="lg" className="w-full md:w-auto">
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            원문 보기
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </main>
    </div>
  );
}
