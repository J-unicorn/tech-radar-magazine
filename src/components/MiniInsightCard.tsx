interface MiniInsightCardProps {
  title: string;
  lines?: string[];
  text?: string;
}

export function MiniInsightCard({ title, lines, text }: MiniInsightCardProps) {
  return (
    <div className="h-[132px] card-base p-4 flex flex-col">
      <h4 className="text-[16px] leading-[24px] font-semibold text-app mb-3">
        {title}
      </h4>
      
      {lines && lines.length > 0 && (
        <ul className="space-y-1 flex-1">
          {lines.slice(0, 3).map((line, idx) => (
            <li 
              key={idx} 
              className="text-[12px] leading-[18px] text-muted-app flex items-start gap-2"
            >
              <span className="text-accent font-bold shrink-0">•</span>
              <span className="line-clamp-1">{line}</span>
            </li>
          ))}
        </ul>
      )}

      {text && !lines && (
        <p className="text-[12px] leading-[18px] text-muted-app line-clamp-3 flex-1">
          {text}
        </p>
      )}
    </div>
  );
}
