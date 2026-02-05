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
     <div className="card-base p-3 hover:shadow-md h-full flex flex-col">
      {/* Header */}
       <div className="flex items-start gap-3 mb-3">
         {/* Avatar - 36px */}
         <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-accent" />
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/creators/${creator.id}`}>
             <h3 className="text-[14px] leading-[20px] font-semibold text-app hover:text-accent transition-colors line-clamp-1">
              {creator.name}
            </h3>
          </Link>
           <p className="text-[11px] leading-[16px] text-muted-app line-clamp-1">{creator.tagline}</p>
        </div>

        {/* Subscribe button */}
        <Button
          variant={isSubscribed ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleSubscribe(creator.id)}
           className={`text-[11px] h-7 px-2 ${isSubscribed ? "text-accent" : ""}`}
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
       <div className="space-y-2 flex-1">
        {topItems.slice(0, 2).map(item => (
          <Link
            key={item!.id}
            to={`/content/${item!.id}`}
             className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
             <div className="w-12 h-9 rounded overflow-hidden bg-surface flex-shrink-0">
              <img
                src={item!.thumb}
                alt={item!.title}
                className="w-full h-full object-cover"
              />
            </div>
             <span className="text-[12px] leading-[18px] text-app line-clamp-2 flex-1">{item!.title}</span>
          </Link>
        ))}
      </div>

      {/* More button */}
      <Link to={`/creators/${creator.id}`}>
         <Button variant="outline" size="sm" className="w-full mt-3 border-app text-muted-app hover:text-app text-[12px]">
          더 보기
        </Button>
      </Link>
    </div>
  );
}
