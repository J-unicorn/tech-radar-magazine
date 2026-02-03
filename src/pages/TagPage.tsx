import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockData, getChipById, Item } from "@/data/mockData";
import { InfiniteContentList } from "@/components/InfiniteContentList";
import { ContentListCard } from "@/components/ContentListCard";

export default function TagPage() {
  const { chipId } = useParams<{ chipId: string }>();
  const chip = chipId ? getChipById(chipId) : undefined;
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

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

  const filteredItems = useMemo(() => {
    if (!chipId) return [];

    let items = mockData.items.filter((item) => item.chipIds.includes(chipId));

    if (sortBy === "popular") {
      items = [...items].sort((a, b) => b.statsMock.views - a.statsMock.views);
    }

    return items;
  }, [chipId, sortBy]);

  if (!chip) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[20px] font-semibold text-app mb-2">태그를 찾을 수 없습니다</h1>
          <Link to="/" className="text-accent hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-app">
        <div className="container-padding">
          <div className="flex items-center justify-between h-[72px] max-w-[1200px] mx-auto">
            <Link to="/" className="flex items-center gap-2 text-muted-app hover:text-app transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">뒤로가기</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto container-padding py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[20px] leading-[28px] font-semibold text-app">{chip.label}</h1>
            <p className="text-[12px] leading-[18px] text-muted-app mt-1">Tech Radar가 모은 관련 콘텐츠</p>
          </div>

          {/* Sort controls */}
          <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as "latest" | "popular")}>
            <TabsList className="bg-transparent h-auto p-0 gap-1">
              <TabsTrigger
                value="latest"
                className="px-4 py-2 text-[14px] font-medium rounded-full transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-app"
              >
                최신순
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="px-4 py-2 text-[14px] font-medium rounded-full transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-app"
              >
                인기순
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content List with Infinite Scroll */}
        <InfiniteContentList
          items={filteredItems}
          pageSize={10}
          renderItem={(item: Item) => (
            <ContentListCard
              item={item}
              isBookmarked={bookmarkedIds.has(item.id)}
              onToggleBookmark={toggleBookmark}
            />
          )}
        />

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-app">해당 태그의 콘텐츠가 없습니다</p>
          </div>
        )}
      </main>
    </div>
  );
}
