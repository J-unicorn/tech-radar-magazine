import { Bookmark, Play, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Item, getKindLabel, getChipById } from "@/data/mockData";
import { Link } from "react-router-dom";

interface ContentListCardProps {
  item: Item;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function ContentListCard({ item, isBookmarked, onToggleBookmark }: ContentListCardProps) {
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
    <div className="card-base p-4 flex gap-4 hover:border-accent/20">
      {/* Thumbnail - 160x90 (16:9) */}
      <Link to={`/content/${item.id}`} className="flex-shrink-0">
        <div className="relative w-[160px] h-[90px] rounded-lg overflow-hidden bg-surface">
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
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[12px] text-white">
            {item.minutesMock}분
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link to={`/content/${item.id}`}>
            <h3 className="text-[16px] leading-[24px] font-semibold text-app line-clamp-2 hover:text-accent transition-colors">
              {item.title}
            </h3>
          </Link>
          <p className="text-[14px] leading-[22px] text-muted-app mt-1 line-clamp-2">
            {item.summary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[12px] leading-[18px] text-muted-app">
              <KindIcon className="w-3 h-3" />
              {getKindLabel(item.kind)}
            </span>
            <span className="text-[12px] text-muted-app">·</span>
            <span className="text-[12px] leading-[18px] text-muted-app">{item.minutesMock}분</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-wrap gap-1">
              {item.chipIds.slice(0, 3).map(chipId => {
                const chip = getChipById(chipId);
                return chip ? (
                  <span key={chipId} className="px-2 py-0.5 bg-surface rounded-full text-[12px] text-muted-app border border-app">
                    {chip.label}
                  </span>
                ) : null;
              })}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isBookmarked ? "text-accent" : "text-muted-app"}`}
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
