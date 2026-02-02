import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockData, getItemById, getChipById, getKindLabel } from "@/data/mockData";
import { Link } from "react-router-dom";

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroItems = mockData.layout.heroIds.map(id => getItemById(id)).filter(Boolean);
  
  const currentItem = heroItems[currentIndex];
  if (!currentItem) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  const getBadgeClass = (badge: string) => {
    const lower = badge.toLowerCase();
    if (lower === "hot") return "badge-hot";
    if (lower === "new") return "badge-new";
    if (lower === "추천") return "badge-recommend";
    if (lower === "인기") return "badge-popular";
    if (lower === "핵심") return "badge-core";
    if (lower === "입문") return "badge-intro";
    if (lower === "kor") return "badge-kor";
    return "badge-recommend";
  };

  return (
    <div className="card-hero relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[2.2/1] group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentItem.thumb}
          alt={currentItem.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 gradient-hero-overlay" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
        {/* Top: Badge */}
        <div className="flex items-start justify-between">
          <Badge className={`${getBadgeClass(currentItem.badges[0] || "추천")} px-3 py-1`}>
            {currentItem.badges[0] || "Tech Radar Pick"}
          </Badge>
          {currentItem.kind === "video" && (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Bottom: Title & Meta */}
        <div className="space-y-3">
          <Link to={`/content/${currentItem.id}`}>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white line-clamp-2 hover:underline">
              {currentItem.title}
            </h2>
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-white/80 text-sm">
            <span>{currentItem.source}</span>
            <span>·</span>
            <span>{currentItem.author}</span>
            <span>·</span>
            <span>{currentItem.minutesMock}분</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentItem.chipIds.slice(0, 2).map(chipId => {
              const chip = getChipById(chipId);
              return chip ? (
                <span key={chipId} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                  {chip.label}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrev}
          className="ml-2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="mr-2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
        {currentIndex + 1}/{heroItems.length}
      </div>
    </div>
  );
}
