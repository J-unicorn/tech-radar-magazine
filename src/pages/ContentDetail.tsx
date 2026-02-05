 import { useParams, Link } from "react-router-dom";
 import { ArrowLeft, ExternalLink, Bookmark, Play, Clock, Eye, Heart, MessageCircle, MessageSquare, X, Sparkles, Trophy, ListChecks } from "lucide-react";
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
 
 // Extract YouTube video ID from URL or use youtubeId field
 function getYouTubeId(item: Item): string | null {
   if (item.youtubeId) return item.youtubeId;
   if (!item.href) return null;
   
   const match = item.href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
   return match ? match[1] : null;
 }
 
 export default function ContentDetail() {
   const { id } = useParams<{ id: string }>();
   const item = id ? getItemById(id) : undefined;
   const [isBookmarked, setIsBookmarked] = useState(false);
   const [isChatOpen, setIsChatOpen] = useState(false);
   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>(() => {
     return id && chatHistoryStore[id] ? chatHistoryStore[id] : [];
   });
   const isMobile = useIsMobile();
 
   const youtubeId = item ? getYouTubeId(item) : null;
 
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
 
   // Derive key takeaways (5-8 bullets)
   const keyTakeaways = item.keyTakeaways || [
     item.summary.split('.')[0] + ".",
     "핵심 개념과 실전 적용 방법을 단계별로 설명합니다.",
     "초보자도 따라할 수 있는 친절한 가이드를 제공합니다.",
     "실무에서 바로 사용할 수 있는 예제 코드를 포함합니다.",
     "주의해야 할 함정과 베스트 프랙티스를 정리합니다.",
     "추가 학습을 위한 참고 자료를 안내합니다."
   ];
 
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
         <main className={`transition-all duration-300 ${isChatOpen && !isMobile ? "flex-[0_0_60%]" : "flex-1"}`}>
           <div className={`max-w-4xl mx-auto container-padding py-6 ${isChatOpen && !isMobile ? "max-w-none px-6" : ""}`}>
             
             {/* Thumbnail / YouTube Player */}
             <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface mb-5">
               {isPlayerOpen && youtubeId ? (
                 <>
                   <iframe
                     src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                     title={item.title}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     className="w-full h-full"
                   />
                   <Button
                     variant="ghost"
                     size="sm"
                     className="absolute top-3 right-3 bg-black/60 text-white hover:bg-black/80 z-10"
                     onClick={() => setIsPlayerOpen(false)}
                   >
                     <X className="w-4 h-4 mr-1" />
                     닫기
                   </Button>
                 </>
               ) : (
                 <>
                   <img
                     src={item.thumb}
                     alt={item.title}
                     className="w-full h-full object-cover"
                   />
                   {item.kind === "video" && youtubeId && (
                     <button
                       onClick={() => setIsPlayerOpen(true)}
                       className="absolute inset-0 flex items-center justify-center group"
                     >
                       <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/80 transition-colors">
                         <Play className="w-8 h-8 text-white fill-white" />
                       </div>
                     </button>
                   )}
                   {item.kind === "video" && !youtubeId && (
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                         <Play className="w-8 h-8 text-white fill-white" />
                       </div>
                     </div>
                   )}
                 </>
               )}
             </div>
 
             {/* Combined Summary Container - AI 세줄요약 + Tech Radar Pick */}
             <div className="grid md:grid-cols-2 gap-4 mb-5">
               {/* AI 세줄요약 */}
               <div className="p-4 bg-surface rounded-xl border border-app">
                 <h3 className="text-[14px] font-semibold text-app mb-3 flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-accent" />
                   AI 세줄요약
                 </h3>
                 <ul className="space-y-2">
                   {aiSummary3.map((line, idx) => (
                     <li key={idx} className="flex items-start gap-2 text-[13px] leading-[20px] text-app">
                       <span className="text-accent font-bold shrink-0">•</span>
                       <span className="line-clamp-2">{line}</span>
                     </li>
                   ))}
                 </ul>
               </div>
 
               {/* Tech Radar Pick */}
               <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
                 <h3 className="text-[14px] font-semibold text-accent mb-3 flex items-center gap-2">
                   <Trophy className="w-4 h-4" />
                   Tech Radar Pick
                 </h3>
                 <p className="text-[13px] leading-[20px] text-app">{radarPickReason}</p>
               </div>
             </div>
 
             {/* Key Takeaways - 영상 핵심 요약 */}
             <div className="p-4 bg-surface rounded-xl border border-app mb-5">
               <h3 className="text-[14px] font-semibold text-app mb-3 flex items-center gap-2">
                 <ListChecks className="w-4 h-4 text-accent" />
                 영상 핵심 요약
               </h3>
               <ul className="space-y-2">
                 {keyTakeaways.slice(0, 8).map((point, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-[13px] leading-[20px] text-app">
                     <span className="text-accent font-bold shrink-0">{idx + 1}.</span>
                     <span>{point}</span>
                   </li>
                 ))}
               </ul>
             </div>
 
             {/* Badges */}
             <div className="flex flex-wrap gap-2 mb-3">
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
             <h1 className="text-[20px] md:text-[24px] leading-[28px] md:leading-[32px] font-semibold text-app mb-3">
               {item.title}
             </h1>
 
             {/* Meta */}
             <div className="flex flex-wrap items-center gap-4 text-[12px] leading-[18px] text-muted-app mb-4">
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
             <div className="flex items-center gap-6 mb-5">
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
 
             {/* Chips */}
             <div className="mb-5">
               <h3 className="text-[14px] font-semibold text-app mb-2">관련 태그</h3>
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