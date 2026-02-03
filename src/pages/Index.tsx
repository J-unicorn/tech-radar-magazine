import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MiniCard } from "@/components/MiniCard";
import { RankingCard } from "@/components/RankingCard";
import { CollectionCard } from "@/components/CollectionCard";
import { CreatorCard } from "@/components/CreatorCard";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SectionHeader } from "@/components/SectionHeader";
import { mockData, getItemById, Item } from "@/data/mockData";

const Index = () => {
  // State management
  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");
  const [activeChipId, setActiveChipId] = useState<string | null>(null);
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

  // Get mini card items
  const miniItems = mockData.layout.miniIds
    .map((id) => getItemById(id))
    .filter((item): item is Item => item !== undefined);

  return (
    <div className="min-h-screen bg-app">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeChipId={activeChipId}
        onChipChange={setActiveChipId}
      />

      <main className="max-w-[1200px] mx-auto container-padding">
        {/* Main Grid Section */}
        <section className="py-6 md:py-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Hero + Mini Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <HeroCarousel />
              <div className="grid md:grid-cols-2 gap-6">
                {miniItems.map((item) => (
                  <MiniCard
                    key={item.id}
                    item={item}
                    isBookmarked={bookmarkedIds.has(item.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Ranking (4 cols) */}
            <div className="lg:col-span-4">
              <RankingCard />
            </div>
          </div>
        </section>

        {/* Collections Section - 추천 로드맵 */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar 추천 로드맵"
            subtitle="AI Agent · Vibe Coding을 빠르게 익히는 큐레이션"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.layout.collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                isBookmarked={bookmarkedIds.has(collection.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </section>

        {/* Trending Tools Section */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar 트렌딩 툴 컬렉션"
            subtitle="Cursor · LangGraph · MCP · n8n 중심"
            href="/"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.layout.collections.map((collection, index) => (
              <CollectionCard
                key={`trending-${collection.id}`}
                collection={collection}
                isBookmarked={bookmarkedIds.has(collection.id)}
                onToggleBookmark={toggleBookmark}
                showAd={index === 1}
              />
            ))}
          </div>
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
