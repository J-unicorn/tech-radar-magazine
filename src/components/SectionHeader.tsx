import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
}

export function SectionHeader({ title, subtitle, href }: SectionHeaderProps) {
  const TitleComponent = href ? Link : "div";
  
  return (
    <div className="mb-6 md:mb-8">
      <TitleComponent
        to={href || "#"}
        className={`inline-flex items-center gap-1 ${href ? "hover:text-primary transition-colors" : ""}`}
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
        {href && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </TitleComponent>
      {subtitle && (
        <p className="text-sm md:text-base text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}
