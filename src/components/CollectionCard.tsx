import { Bookmark, Eye, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collection, getItemById, formatViews } from "@/data/mockData";
import { Link } from "react-router-dom";

interface CollectionCardProps {
  collection: Collection;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  showAd?: boolean;
}

export function CollectionCard({ collection, isBookmarked, onToggleBookmark, showAd }: CollectionCardProps) {
  const firstItem = getItemById(collection.itemIds[0]);
  const items = collection.itemIds.map(id => getItemById(id)).filter(Boolean);
  
  // Aggregate stats
  const totalViews = items.reduce((acc, item) => acc + (item?.statsMock.views || 0), 0);
  const totalLikes = items.reduce((acc, item) => acc + (item?.statsMock.likes || 0), 0);
  const totalComments = items.reduce((acc, item) => acc + (item?.statsMock.comments || 0), 0);

  return (
     <div className="card-base overflow-hidden group hover:shadow-md h-full flex flex-col">
      {/* Cover Image - 16:9 aspect ratio */}
      <Link to={`/collections/${collection.id}`} className="block relative aspect-[16/9] overflow-hidden">
        <img
          src={firstItem?.thumb || "https://placehold.co/640x360?text=Collection"}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Item count badge - top left */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-[12px] font-medium">
          {collection.itemIds.length}개 콘텐츠
        </div>

        {/* AD badge */}
        {showAd && (
          <div className="absolute top-3 right-12 px-2 py-1 bg-surface/80 backdrop-blur-sm rounded text-[12px] font-medium text-muted-app">
            AD
          </div>
        )}

        {/* Bookmark button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm ${
            isBookmarked ? "text-accent" : "text-white"
          } hover:bg-white/30`}
          onClick={(e) => {
            e.preventDefault();
            onToggleBookmark(collection.id);
          }}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
        </Button>
      </Link>

      {/* Content */}
       <div className="p-3 flex-1 flex flex-col">
        <Link to={`/collections/${collection.id}`}>
           <h3 className="text-[14px] leading-[20px] font-semibold text-app line-clamp-2 hover:text-accent transition-colors h-[40px]">
            {collection.title}
          </h3>
        </Link>
         <p className="text-[11px] leading-[16px] text-muted-app mt-1 line-clamp-1">{collection.subtitle}</p>
        
        {/* Stats */}
         <div className="flex items-center gap-3 mt-auto pt-2 text-[11px] text-muted-app">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {formatViews(totalViews)}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {formatViews(totalLikes)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {totalComments}
          </span>
        </div>
      </div>
    </div>
  );
}
