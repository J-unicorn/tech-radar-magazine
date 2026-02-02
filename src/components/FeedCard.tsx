import { Bookmark, Play, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Item, getKindLabel, getChipById } from "@/data/mockData";
import { Link } from "react-router-dom";

interface FeedCardProps {
  item: Item;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function FeedCard({ item, isBookmarked, onToggleBookmark }: FeedCardProps) {
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

  const KindIcon = item.kind === "video" ? Play : item.kind === "doc" ? BookOpen : FileText;

  return (
    <div className="card-base p-4 flex gap-4 hover:border-primary/20">
      {/* Thumbnail */}
      <Link to={`/content/${item.id}`} className="flex-shrink-0">
        <div className="relative w-32 h-20 md:w-40 md:h-24 rounded-lg overflow-hidden bg-muted">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.kind === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          )}
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-xs text-white">
            {item.minutesMock}분
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <KindIcon className="w-3 h-3" />
              {getKindLabel(item.kind)}
            </span>
            {item.badges.map(badge => (
              <Badge key={badge} variant="secondary" className={`text-xs px-1.5 py-0 ${getBadgeClass(badge)}`}>
                {badge}
              </Badge>
            ))}
          </div>
          <Link to={`/content/${item.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
              {item.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1 hidden md:block">
            {item.summary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xs text-muted-foreground truncate">{item.source}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground truncate">{item.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-wrap gap-1">
              {item.chipIds.slice(0, 2).map(chipId => {
                const chip = getChipById(chipId);
                return chip ? (
                  <span key={chipId} className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
                    {chip.label}
                  </span>
                ) : null;
              })}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isBookmarked ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => onToggleBookmark(item.id)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
