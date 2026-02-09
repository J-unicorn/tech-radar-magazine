import { Sparkles, Trophy } from "lucide-react";
import { Item, getChipById } from "@/data/mockData";

interface InsightPanelProps {
  currentHeroItem: Item;
}

export function InsightPanel({ currentHeroItem }: InsightPanelProps) {
  // Derive AI summary - use aiSummary3 or fallback
  const aiSummary = currentHeroItem.aiSummary3 || [
    currentHeroItem.summary.slice(0, 50) + "...",
    "핵심 개념과 실전 적용 방법 제시",
    "초보자도 따라할 수 있는 단계별 가이드"
  ];

  // Derive radar pick reason
  const radarPickReason = currentHeroItem.radarPickReason || 
    `${currentHeroItem.statsMock.views.toLocaleString()} 조회와 ${currentHeroItem.badges[0] || "추천"} 태그로 주목받는 콘텐츠입니다.`;

  return (
    <div className="card-base p-4">
      <h3 className="text-[14px] font-semibold text-app mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        Insight
      </h3>
      
      {/* Two symmetric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Left card: AI bullets */}
        <div className="card-base p-4 h-full min-h-[140px] md:min-h-[140px] flex flex-col">
          <h4 className="text-[12px] font-medium text-muted-app mb-2">AI가 분석한 핵심</h4>
          <ul className="space-y-2 flex-1">
            {aiSummary.slice(0, 5).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] leading-[20px] text-app">
                <span className="text-accent font-bold mt-0.5">•</span>
                <span className="line-clamp-2">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right card: Tech Radar Pick */}
        <div className="card-base p-4 h-full min-h-[140px] md:min-h-[140px] flex flex-col bg-accent/5 border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-[12px] font-semibold text-accent">TECH RADAR PICK</span>
            <span className="text-[11px] text-muted-app">오늘</span>
          </div>
          <p className="text-[13px] leading-[20px] text-app line-clamp-3 flex-1">
            {radarPickReason}
          </p>
        </div>
      </div>
    </div>
  );
}