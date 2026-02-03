import { mockData, getItemById, getKindLabel } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function RankingCard() {
  const rankingItems = mockData.layout.weeklyRankingIds
    .map(id => getItemById(id))
    .filter(Boolean);

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
    <div className="card-base p-4 min-h-[576px]">
      <h3 className="text-[20px] leading-[28px] font-semibold text-app mb-4">
        이번 주 Tech Radar 인기
      </h3>
      <div className="space-y-0">
        {rankingItems.map((item, index) => (
          <div key={item!.id}>
            <div className="flex items-center gap-3 h-[72px]">
              {/* Rank Number - accent color */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[14px] font-bold text-accent">
                {index + 1}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link to={`/content/${item!.id}`}>
                  <h4 className="text-[14px] leading-[22px] font-medium text-app line-clamp-1 hover:text-accent transition-colors">
                    {item!.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  {item!.badges.slice(0, 1).map(badge => (
                    <Badge key={badge} variant="secondary" className={`text-[10px] px-1.5 py-0 ${getBadgeClass(badge)}`}>
                      {badge}
                    </Badge>
                  ))}
                  <span className="text-[12px] leading-[18px] text-muted-app">
                    {getKindLabel(item!.kind)} · {item!.minutesMock}분
                  </span>
                </div>
              </div>

              {/* Thumbnail - 56px square */}
              <Link to={`/content/${item!.id}`} className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface">
                  <img
                    src={item!.thumb}
                    alt={item!.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
            {index < rankingItems.length - 1 && <Separator className="border-app" />}
          </div>
        ))}
      </div>
    </div>
  );
}
