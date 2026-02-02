import { Bell, BellOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Creator, getItemById } from "@/data/mockData";
import { Link } from "react-router-dom";

interface CreatorCardProps {
  creator: Creator;
  isSubscribed: boolean;
  onToggleSubscribe: (id: string) => void;
}

export function CreatorCard({ creator, isSubscribed, onToggleSubscribe }: CreatorCardProps) {
  const topItems = creator.topItemIds.map(id => getItemById(id)).filter(Boolean);

  return (
    <div className="card-base p-5 hover:border-primary/20">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/creators/${creator.id}`}>
            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
              {creator.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">{creator.tagline}</p>
        </div>

        {/* Subscribe button */}
        <Button
          variant={isSubscribed ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleSubscribe(creator.id)}
          className={isSubscribed ? "text-primary" : ""}
        >
          {isSubscribed ? (
            <>
              <BellOff className="w-4 h-4 mr-1" />
              알림 끄기
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-1" />
              알림
            </>
          )}
        </Button>
      </div>

      {/* Top Items */}
      <div className="space-y-3">
        {topItems.slice(0, 2).map(item => (
          <Link
            key={item!.id}
            to={`/content/${item!.id}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
              <img
                src={item!.thumb}
                alt={item!.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-foreground line-clamp-1 flex-1">{item!.title}</span>
          </Link>
        ))}
      </div>

      {/* More button */}
      <Link to={`/creators/${creator.id}`}>
        <Button variant="outline" className="w-full mt-4">
          더 보기
        </Button>
      </Link>
    </div>
  );
}
