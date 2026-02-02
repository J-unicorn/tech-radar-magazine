import { Bookmark, Mail, Bot, Lightbulb, LucideIcon } from "lucide-react";
import { HandbookCard as HandbookCardType } from "@/data/mockData";

const iconMap: Record<string, LucideIcon> = {
  Bookmark,
  Mail,
  Bot,
  Lightbulb,
};

interface HandbookCardProps {
  card: HandbookCardType;
}

export function HandbookCard({ card }: HandbookCardProps) {
  const Icon = iconMap[card.icon] || Bookmark;

  return (
    <div className="relative p-5 rounded-2xl bg-surface border border-border overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer">
      {/* Content */}
      <div className="relative z-10">
        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
          {card.label}
        </span>
        <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
        <p className="text-sm text-muted-foreground">{card.desc}</p>
      </div>

      {/* Background Icon */}
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24 text-primary" strokeWidth={1} />
      </div>
    </div>
  );
}
