import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item, getKindLabel } from "@/data/mockData";
import { Link } from "react-router-dom";

interface MiniCardProps {
  item: Item;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function MiniCard({ item, isBookmarked, onToggleBookmark }: MiniCardProps) {
  return (
    <div className="card-base p-4 flex gap-4 hover:border-primary/20">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <Link to={`/content/${item.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
              {item.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-medium">
              {getKindLabel(item.kind)}
            </span>
            <span>{item.minutesMock}분</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-muted-foreground truncate">{item.author}</span>
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

      {/* Thumbnail */}
      <Link to={`/content/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
          <img
            src={item.thumb}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
}
