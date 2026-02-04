import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bigTechUpdatesMock, BigTechSlide } from "@/data/bigTechUpdatesMock";

export function BigTechUpdateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = bigTechUpdatesMock.slides;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(goToNext, bigTechUpdatesMock.rotateMs);
    return () => clearInterval(interval);
  }, [goToNext]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-[180px] rounded-xl border border-app bg-surface overflow-hidden">
      {/* Slide content */}
      {currentSlide.type === "brand-update" && (
        <BrandUpdateSlide slide={currentSlide as Extract<BigTechSlide, { type: "brand-update" }> } />
      )}
      {currentSlide.type === "vs-compare" && (
        <VsCompareSlide slide={currentSlide as Extract<BigTechSlide, { type: "vs-compare" }> } />
      )}
      {currentSlide.type === "overlay-report" && (
        <OverlayReportSlide slide={currentSlide as Extract<BigTechSlide, { type: "overlay-report" }> } />
      )}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/80 border border-app hover:bg-surface"
        onClick={goToPrev}
      >
        <ChevronLeft className="h-5 w-5 text-app" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/80 border border-app hover:bg-surface"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5 text-app" />
      </Button>

      {/* Pagination dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? "bg-accent" : "bg-surface border border-app"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

function BrandUpdateSlide({ slide }: { slide: Extract<BigTechSlide, { type: "brand-update" }> }) {
  return (
    <div className="h-full flex">
      {/* Brand strip */}
      <div className="w-1.5 h-full" style={{ backgroundColor: slide.brandColor }} />
      
      <div className="flex-1 p-5 flex items-center gap-4">
        {/* Logo */}
        <div 
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden"
        >
          <img src={slide.logoUrl} alt="" className="w-8 h-8 object-contain" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span 
              className="text-[12px] font-medium"
              style={{ color: slide.brandColor }}
            >
              {slide.brandLabel}
            </span>
            <span className="text-[12px] text-muted-app">{slide.timeLabel}</span>
          </div>
          
          <h3 className="text-[16px] leading-[24px] font-semibold text-app line-clamp-2 mb-2">
            {slide.title}
          </h3>

          {slide.badge && (
            <span 
              className="inline-block text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ 
                backgroundColor: slide.badgeBg,
                color: slide.badgeText
              }}
            >
              {slide.badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function VsCompareSlide({ slide }: { slide: Extract<BigTechSlide, { type: "vs-compare" }> }) {
  return (
    <div className="h-full flex relative">
      {/* Left half */}
      <div 
        className="w-1/2 h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${slide.leftImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-12 left-4">
          <span className="text-white text-[14px] font-bold">{slide.leftLabel}</span>
        </div>
      </div>

      {/* Right half */}
      <div 
        className="w-1/2 h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${slide.rightImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-12 right-4">
          <span className="text-white text-[14px] font-bold">{slide.rightLabel}</span>
        </div>
      </div>

      {/* VS badge center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface border-2 border-app flex items-center justify-center">
        <span className="text-[14px] font-bold text-app">VS</span>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-sm px-4 py-2">
        <h3 className="text-[14px] font-semibold text-app">{slide.title}</h3>
        <p className="text-[11px] text-muted-app">{slide.tags}</p>
      </div>
    </div>
  );
}

function OverlayReportSlide({ slide }: { slide: Extract<BigTechSlide, { type: "overlay-report" }> }) {
  return (
    <div 
      className="h-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-5 flex flex-col">
        {/* Top row */}
        <div className="flex items-center gap-3 mb-3">
          <span 
            className="text-[11px] font-medium px-2 py-1 rounded bg-surface"
            style={{ color: "#00205b" }}
          >
            {slide.pill}
          </span>
          <span className="text-[11px] text-white/70">{slide.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] leading-[24px] font-semibold text-white line-clamp-2 mb-3">
          {slide.title}
        </h3>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {slide.topics.map((topic, idx) => (
            <span key={idx} className="text-[11px] text-white/70">
              {topic}{idx < slide.topics.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
