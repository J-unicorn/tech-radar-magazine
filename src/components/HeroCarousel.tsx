import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockData, getItemById, getChipById } from "@/data/mockData";
import { Link } from "react-router-dom";

interface HeroCarouselProps {
  heroIndex: number;
  onIndexChange: (index: number) => void;
}

export function HeroCarousel({ heroIndex, onIndexChange }: HeroCarouselProps) {
  const heroItems = mockData.layout.heroIds
    .map(id => getItemById(id))
    .filter(Boolean);

  const totalSlides = heroItems.length;

  const goToPrevious = () => {
    onIndexChange(heroIndex === 0 ? totalSlides - 1 : heroIndex - 1);
  };

  const goToNext = () => {
    onIndexChange(heroIndex === totalSlides - 1 ? 0 : heroIndex + 1);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [heroIndex]);

  const currentItem = heroItems[heroIndex];
  if (!currentItem) return null;

  return (
    <div className="relative h-[420px] rounded-[24px] overflow-hidden group">
      {/* Background Image */}
      <Link to={`/content/${currentItem.id}`} className="block absolute inset-0">
        <img
          src={currentItem.thumb}
          alt={currentItem.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        {/* Gradient overlay - from 35% */}
        <div className="absolute inset-0 gradient-hero-overlay" />
      </Link>

      {/* Top-left badge - 28px height, accent background */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center h-7 px-3 rounded-full text-[12px] font-medium bg-accent text-white">
          {currentItem.badges[0] || "Tech Radar Pick"}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <Link to={`/content/${currentItem.id}`}>
          <h2 className="text-[20px] md:text-[24px] leading-[28px] md:leading-[32px] font-semibold text-white line-clamp-2 mb-2">
            {currentItem.title}
          </h2>
        </Link>
        <p className="text-[12px] leading-[18px] text-white/80 mb-3">
          {currentItem.source} · {currentItem.author} · {currentItem.minutesMock}분
        </p>
        <div className="flex flex-wrap gap-2">
          {currentItem.chipIds.slice(0, 2).map(chipId => {
            const chip = getChipById(chipId);
            return chip ? (
              <span key={chipId} className="px-3 py-1 rounded-full text-[12px] border border-white/40 text-white/90">
                {chip.label}
              </span>
            ) : null;
          })}
        </div>
      </div>

      {/* Navigation arrows - 36px circular */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.preventDefault(); goToPrevious(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => { e.preventDefault(); goToNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Pagination pill - bottom right */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-[12px]">
        {heroIndex + 1}/{totalSlides}
      </div>
    </div>
  );
}
