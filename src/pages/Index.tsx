import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MiniInsightCard } from "@/components/MiniInsightCard";
import { RankingCard } from "@/components/RankingCard";
import { TechInsightBannerCard } from "@/components/TechInsightBannerCard";
import { BigTechUpdateCarousel } from "@/components/BigTechUpdateCarousel";
import { CollectionCarousel } from "@/components/CollectionCarousel";
import { CreatorCard } from "@/components/CreatorCard";
import { SectionHeader } from "@/components/SectionHeader";
import { mockData, getItemById, Item } from "@/data/mockData";
 import { InsightPanel } from "@/components/InsightPanel";
 import { TechInsightBannerWide } from "@/components/TechInsightBannerWide";

const Index = () => {
  // State management
  const [heroIndex, setHeroIndex] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [subscribedCreatorIds, setSubscribedCreatorIds] = useState<Set<string>>(new Set());

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle creator subscription
  const toggleSubscribe = (id: string) => {
    setSubscribedCreatorIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Get current hero item for mini insight cards
  const heroItems = mockData.layout.heroIds
    .map((id) => getItemById(id))
    .filter((item): item is Item => item !== undefined);
  
  const currentHeroItem = heroItems[heroIndex] || heroItems[0];

  return (
    <div className="min-h-screen bg-app">
      <Header />

       <main className="max-w-[1200px] mx-auto container-padding">
         {/* Row A: Top Grid — 2-row layout with Weekly spanning both */}
         <section className="py-5 md:py-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-4">
             {/* Hero — col-span-8, row 1 */}
             <div className="col-span-12 lg:col-span-8">
              <HeroCarousel 
                heroIndex={heroIndex} 
                onIndexChange={setHeroIndex} 
              />
            </div>

             {/* Weekly Ranking — col-span-4, spans both rows */}
             <div className="col-span-12 lg:col-span-4 lg:row-span-2 h-full">
              <RankingCard />
            </div>

             {/* Insight Panel — col-span-8, row 2 */}
             <div className="col-span-12 lg:col-span-8">
               {currentHeroItem && <InsightPanel currentHeroItem={currentHeroItem} />}
            </div>
          </div>
        </section>

         {/* Row B: Tech Insight Banner Wide */}
         <section className="pb-8">
           <TechInsightBannerWide />
         </section>
 
        {/* Big Tech Updates Section */}
         <section className="pb-8">
          <SectionHeader
            title="Big Tech 업데이트 소식"
            subtitle="Google · OpenAI · Meta · Anthropic 최신 동향"
          />
          <BigTechUpdateCarousel />
        </section>

        {/* Collections Section - 추천 로드맵 */}
         <section className="pb-8">
          <SectionHeader
            title="Tech Radar 추천 로드맵"
            subtitle="AI Agent · Vibe Coding을 빠르게 익히는 큐레이션"
          />
          <CollectionCarousel
            collections={mockData.layout.collections}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        </section>

        {/* Trending Tools Section */}
         <section className="pb-8">
          <SectionHeader
            title="Tech Radar 트렌딩 툴 컬렉션"
            subtitle="Cursor · LangGraph · MCP · n8n 중심"
            href="/"
          />
          <CollectionCarousel
            collections={mockData.layout.collections}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            showAd={true}
            adIndex={1}
          />
        </section>

        {/* Creators Section */}
         <section className="pb-10">
          <SectionHeader
            title="Tech Radar가 주목한 크리에이터"
            subtitle="영상/글로 배우는 Agent & Vibe"
            href="/"
          />
           {/* 3x3 Grid on Desktop */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             {mockData.layout.creators.slice(0, 9).map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isSubscribed={subscribedCreatorIds.has(creator.id)}
                onToggleSubscribe={toggleSubscribe}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
       <footer className="py-10 border-t border-app">
        <div className="max-w-[1200px] mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-app">Tech Radar</span>
              <span className="text-[12px] text-muted-app">AI Agent & Vibe Coding</span>
            </div>
            <p className="text-[12px] text-muted-app">
               © 2026 Tech Radar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
