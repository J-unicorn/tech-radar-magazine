import { Bookmark, Play, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item, getKindLabel } from "@/data/mockData";
import { Link } from "react-router-dom";

interface MiniCardProps {
  item: Item;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function MiniCard({ item, isBookmarked, onToggleBookmark }: MiniCardProps) {
  const KindIcon = item.kind === "video" ? Play : item.kind === "doc" ? BookOpen : FileText;

  return (
    <div className="card-base p-4 h-[132px] flex gap-4 hover:shadow-md">
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link to={`/content/${item.id}`}>
            <h3 className="text-[16px] leading-[24px] font-semibold text-app line-clamp-2 hover:text-accent transition-colors">
              {item.title}
            </h3>
          </Link>
          <p className="text-[12px] leading-[18px] text-muted-app mt-1 flex items-center gap-1">
            <KindIcon className="w-3 h-3" />
            {getKindLabel(item.kind)} · {item.minutesMock}분
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[18px] text-muted-app truncate">{item.author}</span>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 flex-shrink-0 ${isBookmarked ? "text-accent" : "text-muted-app"}`}
            onClick={() => onToggleBookmark(item.id)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Right: Square thumbnail - 96px */}
      <Link to={`/content/${item.id}`} className="flex-shrink-0">
        <div className="relative w-[96px] h-[96px] rounded-lg overflow-hidden bg-surface">
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
        </div>
      </Link>
    </div>
  );
}
