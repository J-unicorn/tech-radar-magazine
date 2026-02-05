 import { useNavigate } from "react-router-dom";
 import { techInsightBannerMock } from "@/data/mockData";
 import { ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 export function TechInsightBannerWide() {
   const navigate = useNavigate();
 
   return (
     <div 
       className="h-[220px] md:h-[240px] rounded-2xl border border-app bg-surface cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
       onClick={() => navigate("/techinsight")}
     >
       <div className="h-full p-5 md:p-6 flex flex-col md:flex-row items-stretch gap-4">
         {/* Left content */}
         <div className="flex-1 flex flex-col justify-between">
           {/* Tags row */}
           <div className="flex items-center gap-3 mb-3">
             <span className="text-[12px] leading-[18px] font-medium text-muted-app">
               {techInsightBannerMock.tagLeft}
             </span>
             <span className="text-[12px] leading-[18px] font-bold" style={{ color: "#ef4444" }}>
               {techInsightBannerMock.tagRight}
             </span>
           </div>
 
           {/* Headline */}
           <h3 className="text-[18px] md:text-[20px] leading-[26px] md:leading-[28px] font-semibold text-app whitespace-pre-line flex-1">
             {techInsightBannerMock.headline}
           </h3>
 
           {/* Left bars */}
           <div className="flex items-end gap-2 h-[40px] mt-3">
             {techInsightBannerMock.leftBars.map((bar, idx) => (
               <div
                 key={idx}
                 className="w-5 rounded-t transition-colors"
                 style={{
                   height: `${bar.h * 100}%`,
                   backgroundColor: bar.accent 
                     ? "var(--insight-bar-accent)" 
                     : "hsl(var(--border))"
                 }}
               />
             ))}
           </div>
         </div>
 
         {/* Right section with bars and CTA */}
         <div className="flex flex-col justify-between items-end md:w-[200px]">
           {/* Right bars */}
           <div className="flex items-end gap-2 h-[40px]">
             {techInsightBannerMock.rightBars.map((bar, idx) => (
               <div
                 key={idx}
                 className="w-5 rounded-t transition-colors"
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
 
           {/* CTA button */}
           <Button 
             className="mt-4 h-10 px-5 text-[14px] font-medium text-white"
             style={{ backgroundColor: "#00205b" }}
           >
             {techInsightBannerMock.cta}
             <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
         </div>
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