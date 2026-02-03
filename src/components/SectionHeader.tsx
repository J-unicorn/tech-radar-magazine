import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
}

export function SectionHeader({ title, subtitle, href }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {href ? (
          <Link to={href} className="flex items-center gap-1 group">
            <h2 className="text-[20px] leading-[28px] font-semibold text-app group-hover:text-accent transition-colors">
              {title}
            </h2>
            <ChevronRight className="w-5 h-5 text-muted-app group-hover:text-accent transition-colors" />
          </Link>
        ) : (
          <h2 className="text-[20px] leading-[28px] font-semibold text-app">{title}</h2>
        )}
      </div>
      {subtitle && (
        <p className="text-[14px] leading-[22px] text-muted-app mt-1">{subtitle}</p>
      )}
    </div>
  );
}
