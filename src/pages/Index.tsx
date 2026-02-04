import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MiniInsightCard } from "@/components/MiniInsightCard";
import { RankingCard } from "@/components/RankingCard";
import { TechInsightBannerCard } from "@/components/TechInsightBannerCard";
import { BigTechUpdateCarousel } from "@/components/BigTechUpdateCarousel";
import { CollectionCarousel } from "@/components/CollectionCarousel";
import { CreatorCard } from "@/components/CreatorCard";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SectionHeader } from "@/components/SectionHeader";
import { mockData, getItemById, Item } from "@/data/mockData";

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

  // Derive AI summary and pick reason
  const aiSummary3 = currentHeroItem?.aiSummary3 || [
    currentHeroItem?.summary?.slice(0, 40) + "...",
    "핵심 개념과 실전 적용 방법 제시",
    "초보자도 따라할 수 있는 단계별 가이드"
  ];

  const radarPickReason = currentHeroItem?.radarPickReason || 
    `${currentHeroItem?.statsMock?.views?.toLocaleString() || "0"} 조회와 ${currentHeroItem?.badges?.[0] || "추천"} 태그로 주목받는 콘텐츠`;

  return (
    <div className="min-h-screen bg-app">
      <Header />

      <main className="max-w-[1200px] mx-auto container-padding">
        {/* Main Grid Section */}
        <section className="py-6 md:py-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Hero + Mini Insight Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <HeroCarousel 
                heroIndex={heroIndex} 
                onIndexChange={setHeroIndex} 
              />
              <div className="grid md:grid-cols-2 gap-6">
                <MiniInsightCard 
                  title="AI 세줄요약" 
                  lines={aiSummary3 as string[]} 
                />
                <MiniInsightCard 
                  title="Tech Radar Pick" 
                  text={radarPickReason} 
                />
              </div>
            </div>

            {/* Right Column - Ranking + Banner (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <RankingCard />
              <TechInsightBannerCard />
            </div>
          </div>
        </section>

        {/* Big Tech Updates Section */}
        <section className="section-padding">
          <SectionHeader
            title="Big Tech 업데이트 소식"
            subtitle="Google · OpenAI · Meta · Anthropic 최신 동향"
          />
          <BigTechUpdateCarousel />
        </section>

        {/* Collections Section - 추천 로드맵 */}
        <section className="section-padding">
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
        <section className="section-padding">
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
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar가 주목한 크리에이터"
            subtitle="영상/글로 배우는 Agent & Vibe"
            href="/"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.layout.creators.map((creator) => (
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

      {/* Newsletter Section - Full Width */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="py-12 border-t border-app">
        <div className="max-w-[1200px] mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-app">Tech Radar</span>
              <span className="text-[12px] text-muted-app">AI Agent & Vibe Coding</span>
            </div>
            <p className="text-[12px] text-muted-app">
              © 2024 Tech Radar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
