import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "@/components/CollectionCard";
import { Collection } from "@/data/mockData";

interface CollectionCarouselProps {
  collections: Collection[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  showAd?: boolean;
  adIndex?: number;
}

export function CollectionCarousel({ 
  collections, 
  bookmarkedIds, 
  onToggleBookmark,
  showAd = false,
  adIndex = 1
}: CollectionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateScrollState);
      return () => ref.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const gap = 24;
    // On desktop, 4 cards visible
    const cardWidth = (containerWidth - 3 * gap) / 4;
    const scrollAmount = cardWidth + gap;
    
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative group">
      {/* Scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {collections.map((collection, index) => (
          <div 
            key={collection.id}
            className="shrink-0 snap-start"
            style={{
              width: "calc((100% - 72px) / 4)",
              minWidth: "280px"
            }}
          >
            <CollectionCard
              collection={collection}
              isBookmarked={bookmarkedIds.has(collection.id)}
              onToggleBookmark={onToggleBookmark}
              showAd={showAd && index === adIndex}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - desktop only */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface border border-app shadow-md hover:bg-surface opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5 text-app" />
        </Button>
      )}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface border border-app shadow-md hover:bg-surface opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5 text-app" />
        </Button>
      )}

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
