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
    <div className="card-base p-4 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar - 40px */}
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-accent" />
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/creators/${creator.id}`}>
            <h3 className="text-[16px] leading-[24px] font-semibold text-app hover:text-accent transition-colors">
              {creator.name}
            </h3>
          </Link>
          <p className="text-[12px] leading-[18px] text-muted-app line-clamp-1">{creator.tagline}</p>
        </div>

        {/* Subscribe button */}
        <Button
          variant={isSubscribed ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleSubscribe(creator.id)}
          className={isSubscribed ? "text-accent" : ""}
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

      {/* Top Items - thumbnail 56x40 */}
      <div className="space-y-3">
        {topItems.slice(0, 2).map(item => (
          <Link
            key={item!.id}
            to={`/content/${item!.id}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-14 h-10 rounded overflow-hidden bg-surface flex-shrink-0">
              <img
                src={item!.thumb}
                alt={item!.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[14px] leading-[22px] text-app line-clamp-1 flex-1">{item!.title}</span>
          </Link>
        ))}
      </div>

      {/* More button */}
      <Link to={`/creators/${creator.id}`}>
        <Button variant="outline" className="w-full mt-4 border-app text-muted-app hover:text-app">
          더 보기
        </Button>
      </Link>
    </div>
  );
}
