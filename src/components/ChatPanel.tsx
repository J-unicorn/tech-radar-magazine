import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Item } from "@/data/mockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  item: Item;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const quickPrompts = [
  { id: "summary", label: "요약해줘" },
  { id: "key", label: "핵심만" },
  { id: "practical", label: "실무 적용" },
  { id: "caution", label: "주의할 점" },
];

// Canned responses based on prompt type
const cannedResponses: Record<string, string[]> = {
  summary: [
    "이 콘텐츠는 {title}에 대해 다룹니다. 핵심 내용은 다음과 같습니다:\n\n1. 기본 개념과 사용 방법\n2. 실제 적용 사례\n3. 팁과 주의사항",
    "요약하면, 이 콘텐츠에서는 {title}의 핵심 원리와 실전 활용법을 설명합니다.",
  ],
  key: [
    "핵심 포인트:\n• 주요 개념 이해가 중요합니다\n• 단계별로 따라하며 익히세요\n• 실습을 통해 체화하세요",
    "가장 중요한 것은 기본기입니다. {title}의 핵심만 정리하면:\n\n1. 왜 필요한지 이해하기\n2. 어떻게 동작하는지 파악하기\n3. 직접 구현해보기",
  ],
  practical: [
    "실무에서 활용하려면:\n\n1. 작은 프로젝트부터 시작하세요\n2. 팀과 함께 리뷰하며 개선하세요\n3. 문서화를 습관화하세요",
    "실무 적용 팁:\n• MVP부터 시작\n• 점진적 개선\n• 피드백 수집 및 반영",
  ],
  caution: [
    "주의할 점:\n\n⚠️ 과도한 복잡성 피하기\n⚠️ 기본 원리 이해 없이 진행하지 않기\n⚠️ 테스트 없이 배포하지 않기",
    "흔히 하는 실수:\n1. 문서를 읽지 않고 시작\n2. 에러 메시지 무시\n3. 백업 없이 작업",
  ],
  default: [
    "좋은 질문이에요! {title}에 대해 더 자세히 알고 싶으시다면 원문을 확인해보시는 것을 추천드립니다.",
    "이 콘텐츠와 관련해서 더 궁금한 점이 있으시면 말씀해주세요!",
  ],
};

export function ChatPanel({ item, onClose, messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleQuickPrompt = (promptId: string) => {
    const prompt = quickPrompts.find((p) => p.id === promptId);
    if (prompt) {
      onSendMessage(prompt.label);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border-l border-app">
      {/* Header - 56px */}
      <div className="h-[56px] flex items-center justify-between px-4 border-b border-app flex-shrink-0">
        <h3 className="text-[16px] leading-[24px] font-semibold text-app">Tech Radar Assistant</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-app hover:text-app">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 p-4 border-b border-app flex-shrink-0 overflow-x-auto">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handleQuickPrompt(prompt.id)}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors bg-muted/10 text-muted-app hover:bg-accent/10 hover:text-accent border border-app"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[14px] text-muted-app">
              "{item.title}"에 대해 질문해보세요
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-[22px] whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-accent text-white"
                  : "bg-muted/20 text-app border border-app"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input area - fixed bottom */}
      <div className="p-4 border-t border-app flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="질문을 입력하세요..."
            className="h-10 flex-1 bg-app border-app"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-10 px-4 btn-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate response
export function generateResponse(prompt: string, item: Item): string {
  const normalizedPrompt = prompt.toLowerCase();
  
  let responseType = "default";
  if (normalizedPrompt.includes("요약") || normalizedPrompt.includes("summary")) {
    responseType = "summary";
  } else if (normalizedPrompt.includes("핵심") || normalizedPrompt.includes("key")) {
    responseType = "key";
  } else if (normalizedPrompt.includes("실무") || normalizedPrompt.includes("적용") || normalizedPrompt.includes("practical")) {
    responseType = "practical";
  } else if (normalizedPrompt.includes("주의") || normalizedPrompt.includes("caution") || normalizedPrompt.includes("실수")) {
    responseType = "caution";
  }

  const responses = cannedResponses[responseType];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return randomResponse.replace("{title}", item.title);
}
