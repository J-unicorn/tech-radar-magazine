import { useNavigate } from "react-router-dom";
import { techInsightBannerMock } from "@/data/mockData";

export function TechInsightBannerCard() {
  const navigate = useNavigate();

  return (
    <div 
      className="h-[240px] rounded-xl p-[22px] border border-app bg-surface cursor-pointer hover:shadow-md transition-shadow flex flex-col"
      onClick={() => navigate("/insight")}
    >
      {/* Tags row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] leading-[18px] font-medium text-muted-app">
          {techInsightBannerMock.tagLeft}
        </span>
        <span className="text-[12px] leading-[18px] font-medium" style={{ color: "#ef4444" }}>
          {techInsightBannerMock.tagRight}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-[16px] leading-[24px] font-semibold text-app whitespace-pre-line flex-1">
        {techInsightBannerMock.headline}
      </h3>

      {/* Bars visualization */}
      <div className="flex items-end gap-2 h-[48px] mb-3">
        {techInsightBannerMock.bars.map((bar, idx) => (
          <div
            key={idx}
            className="w-6 rounded-t transition-colors"
            style={{
              height: `${bar.h * 100}%`,
              backgroundColor: bar.accent 
                ? "var(--insight-bar-accent)" 
                : "hsl(var(--border))"
            }}
          />
        ))}
        <span className="text-[10px] font-medium text-muted-app ml-2">
          {techInsightBannerMock.barCaption}
        </span>
      </div>

      {/* CTA strip */}
      <div 
        className="rounded-lg py-2 px-4 text-center"
        style={{ backgroundColor: "#00205b" }}
      >
        <span className="text-[14px] font-medium text-white">
          {techInsightBannerMock.cta}
        </span>
      </div>

      {/* CSS variable for bar accent */}
      <style>{`
        :root {
          --insight-bar-accent: #00205b;
        }
        .dark {
          --insight-bar-accent: hsl(162 100% 50%);
        }
      `}</style>
    </div>
  );
}
