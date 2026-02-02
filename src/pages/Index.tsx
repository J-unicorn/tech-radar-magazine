import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MiniCard } from "@/components/MiniCard";
import { RankingCard } from "@/components/RankingCard";
import { CollectionCard } from "@/components/CollectionCard";
import { CreatorCard } from "@/components/CreatorCard";
import { HandbookCard } from "@/components/HandbookCard";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeedCard } from "@/components/FeedCard";
import { SectionHeader } from "@/components/SectionHeader";
import { mockData, getItemById, Item } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

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

  // Filter and sort feed items
  const feedItems = useMemo(() => {
    let items = [...mockData.items];

    // Filter by chip if selected
    if (activeChipId) {
      items = items.filter((item) => item.chipIds.includes(activeChipId));
    }

    // Sort by tab
    if (activeTab === "popular") {
      items.sort((a, b) => b.statsMock.views - a.statsMock.views);
    }

    return items;
  }, [activeTab, activeChipId]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeChipId={activeChipId}
        onChipChange={setActiveChipId}
      />

      <main className="max-w-7xl mx-auto container-padding">
        {/* Main Grid Section */}
        <section className="py-6 md:py-8">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Hero + Mini Cards */}
            <div className="lg:col-span-8 space-y-6">
              <HeroCarousel />
              <div className="grid md:grid-cols-2 gap-4">
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

            {/* Right Column - Ranking */}
            <div className="lg:col-span-4">
              <RankingCard />
            </div>
          </div>
        </section>

        <Separator className="my-4" />

        {/* Collections Section */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar 추천 로드맵"
            subtitle="AI Agent · Vibe Coding을 빠르게 익히는 큐레이션"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-cards">
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

        <Separator className="my-4" />

        {/* Trending Tools Section */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar 트렌딩 툴 컬렉션"
            subtitle="Cursor · LangGraph · MCP · n8n 중심"
            href="/"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-cards">
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

        <Separator className="my-4" />

        {/* Creators Section */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar가 주목한 크리에이터"
            subtitle="영상/글로 배우는 Agent & Vibe"
            href="/"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-cards">
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

        <Separator className="my-4" />

        {/* Handbook Section */}
        <section className="section-padding">
          <SectionHeader
            title="Tech Radar 플레이북"
            subtitle="바로 적용 가능한 레시피 · 루틴 · 템플릿"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-cards">
            {mockData.layout.handbookCards.map((card) => (
              <HandbookCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      </main>

      {/* Newsletter Section - Full Width */}
      <NewsletterSection />

      {/* Feed Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <SectionHeader
            title="전체 콘텐츠"
            subtitle={`${feedItems.length}개의 콘텐츠 ${activeChipId ? `(필터 적용됨)` : ""}`}
          />
          <div className="space-y-4">
            {feedItems.map((item) => (
              <FeedCard
                key={item.id}
                item={item}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Tech Radar</span>
              <span className="text-sm text-muted-foreground">AI Agent & Vibe Coding</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Tech Radar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
