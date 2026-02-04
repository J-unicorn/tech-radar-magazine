export const bigTechUpdatesMock = {
  rotateMs: 5000,
  slides: [
    {
      id: "bt_google_update",
      type: "brand-update" as const,
      brandColor: "#4285F4",
      brandLabel: "Google Cloud Update",
      timeLabel: "2시간 전",
      title: "Gemini 1.5 Pro 기반의 실시간 로그 분석 도구 정식 출시",
      badge: "BREAKING",
      logoUrl: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
      badgeBg: "#EFF6FF",
      badgeText: "#1D4ED8"
    },
    {
      id: "bt_vs_models",
      type: "vs-compare" as const,
      leftLabel: "GPT-4o",
      rightLabel: "Claude 3.5 Sonnet",
      title: "코딩 능력 테스트 결과: Claude의 논리력 압승?",
      tags: "#AI_Model #Coding_Benchmark #2026_Trend",
      leftImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      rightImage: "https://images.unsplash.com/photo-1620712943543-bcc4638ef80d?w=600"
    },
    {
      id: "bt_strategy_report",
      type: "overlay-report" as const,
      pill: "Mckinsey Style Report",
      readTime: "5 min read",
      title: "Meta의 오픈소스 Llama 4 전략: 생태계 장악인가, 고육지책인가?",
      topics: ["수익화 모델 분석", "엔지니어 채용 영향", "하드웨어 협력 구조"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
      overlayColor: "#00205b"
    }
  ]
};

export type BigTechSlide = typeof bigTechUpdatesMock.slides[number];
