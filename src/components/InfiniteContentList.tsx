import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface InfiniteContentListProps<T> {
  items: T[];
  pageSize?: number;
  renderItem: (item: T, index: number) => ReactNode;
  skeletonCount?: number;
  className?: string;
}

export function InfiniteContentList<T>({
  items,
  pageSize = 10,
  renderItem,
  skeletonCount = 3,
  className = "",
}: InfiniteContentListProps<T>) {
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const displayedItems = items.slice(0, displayCount);
  const hasMore = displayCount < items.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + pageSize, items.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, pageSize, items.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMore]);

  // Reset display count when items change
  useEffect(() => {
    setDisplayCount(pageSize);
  }, [items, pageSize]);

  return (
    <div className={className}>
      <div className="space-y-4">
        {displayedItems.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-4 mt-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={`skeleton-${index}`} className="card-base p-4 flex gap-4">
              <Skeleton className="w-[160px] h-[90px] rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sentinel for intersection observer */}
      {hasMore && <div ref={sentinelRef} className="h-4" />}

      {/* End of list indicator */}
      {!hasMore && displayedItems.length > 0 && (
        <div className="text-center py-8 text-muted-app text-[14px]">
          모든 콘텐츠를 불러왔습니다
        </div>
      )}
    </div>
  );
}
