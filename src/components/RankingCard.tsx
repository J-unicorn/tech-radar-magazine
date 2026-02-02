import { mockData, getItemById, getKindLabel } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
    <div className="card-base p-5">
      <h3 className="text-lg font-bold text-foreground mb-4">
        이번 주 Tech Radar 인기
      </h3>
      <div className="space-y-4">
        {rankingItems.map((item, index) => (
          <div key={item!.id} className="flex items-start gap-3">
            {/* Rank Number */}
            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              index === 0 ? "bg-primary text-primary-foreground" :
              index === 1 ? "bg-muted-foreground/80 text-white" :
              index === 2 ? "bg-amber-600 text-white" :
              "bg-muted text-muted-foreground"
            }`}>
              {index + 1}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <Link to={`/content/${item!.id}`}>
                <h4 className="text-sm font-medium text-foreground line-clamp-1 hover:text-primary transition-colors">
                  {item!.title}
                </h4>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {item!.badges.slice(0, 1).map(badge => (
                  <Badge key={badge} variant="secondary" className={`text-xs px-1.5 py-0 ${getBadgeClass(badge)}`}>
                    {badge}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground">
                  {getKindLabel(item!.kind)} · {item!.minutesMock}분
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            <Link to={`/content/${item!.id}`} className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                <img
                  src={item!.thumb}
                  alt={item!.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
