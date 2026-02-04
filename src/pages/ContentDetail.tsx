import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Bookmark, Play, Clock, Eye, Heart, MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getItemById, getChipById, getKindLabel, formatViews, Item } from "@/data/mockData";
import { useState, useCallback } from "react";
import { ChatPanel, generateResponse } from "@/components/ChatPanel";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Store chat history per content id
const chatHistoryStore: Record<string, Message[]> = {};

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const item = id ? getItemById(id) : undefined;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    return id && chatHistoryStore[id] ? chatHistoryStore[id] : [];
  });
  const isMobile = useIsMobile();

  const handleSendMessage = useCallback((content: string) => {
    if (!item || !id) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    const assistantResponse = generateResponse(content, item);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: assistantResponse,
    };

    const newMessages = [...messages, userMessage, assistantMessage];
    setMessages(newMessages);
    chatHistoryStore[id] = newMessages;
  }, [item, id, messages]);

  const handleOpenChat = () => {
    if (item && id) {
      // Seed context if first time opening
      if (messages.length === 0) {
        const chips = item.chipIds.map((cid) => getChipById(cid)?.label).filter(Boolean).join(", ");
        const contextMessage: Message = {
          id: `assistant-context-${Date.now()}`,
          role: "assistant",
          content: `안녕하세요! "${item.title}"에 대해 질문해주세요.\n\n📋 요약: ${item.summary}\n🏷️ 태그: ${chips}`,
        };
        const newMessages = [contextMessage];
        setMessages(newMessages);
        chatHistoryStore[id] = newMessages;
      }
    }
    setIsChatOpen(true);
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-app flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[20px] font-semibold text-app mb-2">콘텐츠를 찾을 수 없습니다</h1>
          <Link to="/" className="text-accent hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const getBadgeClass = (badge: string) => {
    const lower = badge.toLowerCase();
    if (lower === "hot") return "badge-hot";
    if (lower === "new") return "badge-new";
    if (lower === "추천") return "badge-recommend";
    if (lower === "인기") return "badge-popular";
    if (lower === "핵심") return "badge-core";
    if (lower === "입문") return "badge-intro";
    if (lower === "kor") return "badge-kor";
    return "bg-muted text-muted-foreground";
  };

  // Derive AI summary
  const aiSummary3 = item.aiSummary3 || [
    item.summary.slice(0, 50) + "...",
    "핵심 개념과 실전 적용 방법 제시",
    "초보자도 따라할 수 있는 단계별 가이드"
  ];

  // Derive radar pick reason
  const topChip = item.chipIds[0] ? getChipById(item.chipIds[0])?.label : "AI Agent";
  const radarPickReason = item.radarPickReason || 
    `${formatViews(item.statsMock.views)} 조회와 ${item.badges[0] || topChip} 태그로 주목받는 콘텐츠. Tech Radar가 엄선한 ${getKindLabel(item.kind)} 자료입니다.`;

  const ContentSection = () => (
    <>
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface mb-6">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {item.kind === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-[12px]">
          {getKindLabel(item.kind)}
        </Badge>
        {item.badges.map(badge => (
          <Badge key={badge} className={`text-[12px] ${getBadgeClass(badge)}`}>
            {badge}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-[20px] md:text-[24px] leading-[28px] md:leading-[32px] font-semibold text-app mb-4">
        {item.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-[12px] leading-[18px] text-muted-app mb-6">
        <span>{item.source}</span>
        <span>·</span>
        <span>{item.author}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {item.minutesMock}분
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-8">
        <span className="flex items-center gap-1.5 text-[12px] text-muted-app">
          <Eye className="w-4 h-4" />
          {formatViews(item.statsMock.views)} 조회
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-muted-app">
          <Heart className="w-4 h-4" />
          {formatViews(item.statsMock.likes)} 좋아요
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-muted-app">
          <MessageCircle className="w-4 h-4" />
          {item.statsMock.comments} 댓글
        </span>
      </div>

      {/* AI Summary Card */}
      <div className="p-6 bg-surface rounded-2xl mb-4 border border-app">
        <h3 className="text-[16px] font-semibold text-app mb-3">AI 세줄요약</h3>
        <ul className="space-y-2">
          {aiSummary3.map((line, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[14px] leading-[22px] text-muted-app">
              <span className="text-accent font-bold shrink-0">•</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Radar Pick Card */}
      <div className="p-6 bg-surface rounded-2xl mb-8 border border-app">
        <h3 className="text-[16px] font-semibold text-app mb-2">Tech Radar Pick</h3>
        <p className="text-[14px] leading-[22px] text-muted-app">{radarPickReason}</p>
      </div>

      {/* Chips */}
      <div className="mb-8">
        <h3 className="text-[16px] font-semibold text-app mb-3">관련 태그</h3>
        <div className="flex flex-wrap gap-2">
          {item.chipIds.map(chipId => {
            const chip = getChipById(chipId);
            return chip ? (
              <Link key={chipId} to={`/tag/${chipId}`} className="chip hover:chip-active">
                {chip.label}
              </Link>
            ) : null;
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="btn-primary">
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            원문 보기
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleOpenChat}
          className="border-accent text-accent hover:bg-accent/10"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Assistant에게 물어보기
        </Button>
      </div>
    </>
  );

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
            <Button
              variant="ghost"
              size="icon"
              className={isBookmarked ? "text-accent" : "text-muted-app"}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with push-split layout */}
      <div className="flex transition-all duration-300">
        {/* Content panel */}
        <main
          className={`transition-all duration-300 ${
            isChatOpen && !isMobile ? "flex-[0_0_60%]" : "flex-1"
          }`}
        >
          <div className={`max-w-4xl mx-auto container-padding py-8 ${isChatOpen && !isMobile ? "max-w-none px-8" : ""}`}>
            <ContentSection />
          </div>
        </main>

        {/* Chat panel - Desktop push layout */}
        {isChatOpen && !isMobile && (
          <aside className="flex-[0_0_40%] h-[calc(100vh-72px)] sticky top-[72px]">
            <ChatPanel
              item={item}
              onClose={() => setIsChatOpen(false)}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </aside>
        )}
      </div>

      {/* Chat panel - Mobile drawer */}
      {isMobile && (
        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-surface">
            <ChatPanel
              item={item}
              onClose={() => setIsChatOpen(false)}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
