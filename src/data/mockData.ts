export interface Chip {
  id: string;
  label: string;
}

export interface ItemStats {
  views: number;
  likes: number;
  comments: number;
}

export interface Item {
  id: string;
  kind: "video" | "post" | "doc";
  title: string;
  href: string;
  thumb: string;
  source: string;
  author: string;
  chipIds: string[];
  badges: string[];
  minutesMock: number;
  statsMock: ItemStats;
  summary: string;
  lang: string;
  aiSummary3?: [string, string, string];
  radarPickReason?: string;
   youtubeId?: string;
   keyTakeaways?: string[];
}

export interface TechInsightBanner {
  tagLeft: string;
  tagRight: string;
  headline: string;
   leftBars: { h: number; accent: boolean }[];
   rightBars: { h: number; accent: boolean }[];
  barCaption: string;
  cta: string;
}

export const techInsightBannerMock: TechInsightBanner = {
  tagLeft: "INSIGHT #02",
  tagRight: "HOT TOPIC",
  headline: "\"도입 후 성능 30% 개선\"\nNext.js 15의 핵심 변경점",
   leftBars: [
    { h: 0.4, accent: false },
    { h: 0.6, accent: false },
    { h: 1.0, accent: true }
  ],
   rightBars: [
     { h: 0.8, accent: false },
     { h: 0.5, accent: true },
     { h: 0.9, accent: false }
   ],
  barCaption: "Performance Up",
  cta: "인사이트 리포트 확인하기"
};

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  itemIds: string[];
}

export interface Creator {
  id: string;
  name: string;
  tagline: string;
  topItemIds: string[];
}

export interface HandbookCard {
  id: string;
  label: string;
  title: string;
  desc: string;
  icon: string;
}

export interface NewsletterConsent {
  id: string;
  label: string;
  required: boolean;
}

export interface Newsletter {
  headline: string;
  subscriberCountLabel: string;
  consents: NewsletterConsent[];
}

export interface Layout {
  heroIds: string[];
  miniIds: string[];
  weeklyRankingIds: string[];
  collections: Collection[];
  creators: Creator[];
  handbookCards: HandbookCard[];
  newsletter: Newsletter;
}

export interface MockData {
  chips: Chip[];
  layout: Layout;
  items: Item[];
}

export const mockData: MockData = {
  "chips": [
    { "id": "ai-trends", "label": "AI Trends" },
    { "id": "vibe-coding", "label": "VibeCoding" },
    { "id": "agentic-ai", "label": "AgenticAI" },
    { "id": "tools-mcp-api", "label": "Tools (MCP/API)" },
    { "id": "automation-n8n", "label": "Automation (n8n)" },
    { "id": "rag-memory", "label": "RAG/Memory" },
    { "id": "eval", "label": "Eval" },
    { "id": "agent-ops", "label": "Agent Ops" }
  ],
  "layout": {
    "heroIds": ["itm_y_langgraph_adv", "itm_y_mcp_20", "itm_y_vibe_10", "itm_w_replit_vibe", "itm_w_menugen"],
    "miniIds": ["itm_y_cursor_vibe", "itm_w_stackoverflow_vibe"],
    "weeklyRankingIds": ["itm_y_mcp_20", "itm_y_langgraph_course", "itm_w_menugen", "itm_d_n8n_tutorial", "itm_y_vibe_10"],
    "collections": [
      {
        "id": "col_vibe_starter",
        "title": "Vibe Coding 입문: 아이디어→앱 로드맵",
        "subtitle": "Tech Radar 큐레이션",
        "itemIds": ["itm_y_vibe_10", "itm_y_cursor_vibe", "itm_w_replit_vibe", "itm_w_stackoverflow_vibe", "itm_w_vibe_hell", "itm_w_vibe_blog_build", "itm_w_menugen"]
      },
      {
        "id": "col_agent_langgraph",
        "title": "LangGraph로 Agent 설계도 잡기",
        "subtitle": "Tech Radar 큐레이션",
        "itemIds": ["itm_y_langgraph_adv", "itm_y_langgraph_course", "itm_w_datacamp_langgraph", "itm_w_devto_langgraph", "itm_k_wikidocs_langgraph", "itm_k_wikidocs_langgraph_book"]
      },
      {
        "id": "col_mcp_tools",
        "title": "MCP로 툴 연결하기",
        "subtitle": "Tech Radar 큐레이션",
        "itemIds": ["itm_y_mcp_20", "itm_y_mcp_2min", "itm_y_mcp_17", "itm_w_itpro_mcp", "itm_w_mimul_mcp"]
      },
      {
        "id": "col_n8n_automation",
        "title": "n8n 자동화 레시피(Agent 워크플로우)",
        "subtitle": "Tech Radar 큐레이션",
        "itemIds": ["itm_d_n8n_tutorial", "itm_d_n8n_advanced_ai", "itm_d_n8n_ai_workflow_builder", "itm_y_n8n_agents", "itm_y_n8n_beginner_2026"]
      }
    ],
    "creators": [
      {
        "id": "crt_langgraph",
        "name": "LangGraph / Agent Systems",
        "tagline": "그래프 기반 에이전트 설계 흐름을 빠르게",
        "topItemIds": ["itm_y_langgraph_adv", "itm_y_langgraph_course"]
      },
      {
        "id": "crt_vibe_coding",
        "name": "Vibe Coding / Cursor",
        "tagline": "'바로 되는' 루프를 만드는 프롬프트·검증",
        "topItemIds": ["itm_y_vibe_10", "itm_y_cursor_vibe"]
      },
      {
        "id": "crt_mcp_tools",
        "name": "MCP / Tool Integration",
        "tagline": "툴·데이터 연결을 표준화하는 방법",
        "topItemIds": ["itm_y_mcp_20", "itm_w_itpro_mcp"]
       },
       {
         "id": "crt_n8n_automation",
         "name": "n8n / Automation",
         "tagline": "노코드로 AI 워크플로우 자동화",
         "topItemIds": ["itm_d_n8n_tutorial", "itm_y_n8n_agents"]
       },
       {
         "id": "crt_ai_trends",
         "name": "AI Trends & Analysis",
         "tagline": "최신 AI 트렌드와 기술 분석",
         "topItemIds": ["itm_y_mcp_2min", "itm_w_stackoverflow_vibe"]
       },
       {
         "id": "crt_dev_practice",
         "name": "Dev Practice",
         "tagline": "개발 실무 팁과 베스트 프랙티스",
         "topItemIds": ["itm_w_replit_vibe", "itm_w_vibe_hell"]
       },
       {
         "id": "crt_korean_guides",
         "name": "Korean Guides",
         "tagline": "한국어 가이드와 튜토리얼",
         "topItemIds": ["itm_k_wikidocs_langgraph", "itm_w_mimul_mcp"]
       },
       {
         "id": "crt_beginner_friendly",
         "name": "Beginner Friendly",
         "tagline": "입문자를 위한 친절한 콘텐츠",
         "topItemIds": ["itm_y_cursor_vibe", "itm_y_n8n_beginner_2026"]
       },
       {
         "id": "crt_deep_dive",
         "name": "Deep Dive",
         "tagline": "심화 학습과 고급 주제",
         "topItemIds": ["itm_y_langgraph_adv", "itm_d_n8n_advanced_ai"]
       }
    ],
    "handbookCards": [
      { "id": "hb_save", "label": "레시피 저장", "title": "따라하기 링크를 한 번에", "desc": "워크플로우·프롬프트를 저장하고 재사용", "icon": "Bookmark" },
      { "id": "hb_daily", "label": "1일 1실험", "title": "매일 10분 MVP", "desc": "작게 만들고 빠르게 검증하기", "icon": "Mail" },
      { "id": "hb_share", "label": "팀 공유", "title": "노션/슬랙 템플릿", "desc": "설계도·가드레일을 팀 표준으로", "icon": "Bot" },
      { "id": "hb_ask", "label": "물어봐 Agent", "title": "요구사항→구조 추천", "desc": "목표/제약 기반 패턴과 흐름 제안", "icon": "Lightbulb" }
    ],
    "newsletter": {
      "headline": "Tech Radar가 고른 실무 인사이트\n매주 목요일에 만나요.",
      "subscriberCountLabel": "93,157명 뉴스레터 구독 중",
      "consents": [
        { "id": "c_all", "label": "전체 동의하기", "required": false },
        { "id": "c_1", "label": "개인정보 수집·이용 동의", "required": true },
        { "id": "c_2", "label": "개인정보 마케팅 활용 동의", "required": false },
        { "id": "c_3", "label": "마케팅 정보 수신 동의", "required": false }
      ]
    }
  },
  "items": [
    {
      "id": "itm_y_langgraph_adv",
      "kind": "video",
      "title": "LangGraph Tutorial - How to Build Advanced AI Agent Systems",
      "href": "https://www.youtube.com/watch?v=1w5cCXlh7JQ",
      "thumb": "https://i.ytimg.com/vi/1w5cCXlh7JQ/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["agentic-ai", "rag-memory"],
      "badges": ["HOT"],
      "minutesMock": 47,
      "statsMock": { "views": 12800, "likes": 410, "comments": 52 },
      "summary": "LangGraph로 에이전트 시스템을 '그래프'로 설계하는 큰 그림(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["그래프 구조로 복잡한 Agent 흐름을 시각화", "상태 관리와 조건부 분기를 체계적으로 구현", "실무 적용을 위한 디버깅·모니터링 패턴 제시"],
      "radarPickReason": "Agent 시스템의 복잡성을 해결하는 구조적 접근법을 명확히 제시. 12.8K 조회와 410 좋아요가 증명하는 퀄리티."
    },
    {
      "id": "itm_y_langgraph_course",
      "kind": "video",
      "title": "LangGraph Complete Course for Beginners – Complex AI Agents with Python",
      "href": "https://www.youtube.com/watch?v=jGg_1h0qzaM",
      "thumb": "https://i.ytimg.com/vi/jGg_1h0qzaM/hqdefault.jpg",
      "source": "YouTube",
      "author": "freeCodeCamp (YouTube)",
      "chipIds": ["agentic-ai"],
      "badges": ["추천"],
      "minutesMock": 120,
      "statsMock": { "views": 67000, "likes": 2300, "comments": 190 },
      "summary": "초보자용 LangGraph 코스. 노드/엣지/상태 개념을 실습으로(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["노드와 엣지 개념으로 Agent 흐름 이해하기", "상태 관리로 복잡한 대화 컨텍스트 유지", "Python 기반 실습으로 바로 적용 가능"],
      "radarPickReason": "freeCodeCamp의 67K 조회 대작. 입문자도 120분 투자로 LangGraph 핵심을 마스터할 수 있음."
    },
    {
      "id": "itm_y_mcp_20",
      "kind": "video",
      "title": "Model Context Protocol (MCP) Explained in 20 Minutes",
      "href": "https://www.youtube.com/watch?v=N3vHJcHBS-w",
      "thumb": "https://i.ytimg.com/vi/N3vHJcHBS-w/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["tools-mcp-api"],
      "badges": ["핵심"],
      "minutesMock": 20,
      "statsMock": { "views": 56300, "likes": 2100, "comments": 180 },
      "summary": "MCP의 구성(호스트/클라이언트/서버)과 연결 방식 개요(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["MCP의 호스트/클라이언트/서버 3계층 구조 이해", "표준 프로토콜로 AI와 외부 도구 연결 방식 학습", "20분 만에 핵심 개념 정리 완료"],
      "radarPickReason": "56K 조회로 검증된 MCP 필수 입문서. 툴 연결의 표준을 20분에 이해할 수 있음."
    },
    {
      "id": "itm_y_mcp_2min",
      "kind": "video",
      "title": "Get Started With The Model Context Protocol // 2-Minute Tutorial",
      "href": "https://www.youtube.com/watch?v=MC2BwMGFRx4",
      "thumb": "https://i.ytimg.com/vi/MC2BwMGFRx4/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["tools-mcp-api", "ai-trends"],
      "badges": ["NEW"],
      "minutesMock": 2,
      "statsMock": { "views": 69000, "likes": 1600, "comments": 95 },
      "summary": "MCP 최소 셋업을 2분으로 훑는 초단기 튜토리얼(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_y_mcp_17",
      "kind": "video",
      "title": "Model Context Protocol (MCP) Explained in 17 Minutes",
      "href": "https://www.youtube.com/watch?v=G5KyIzV-254",
      "thumb": "https://i.ytimg.com/vi/G5KyIzV-254/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["tools-mcp-api"],
      "badges": [],
      "minutesMock": 17,
      "statsMock": { "views": 31200, "likes": 980, "comments": 88 },
      "summary": "MCP를 짧게 정리한 설명 영상(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_y_vibe_10",
      "kind": "video",
      "title": "Learn to Vibe Code in 10 Minutes (Full Beginners Tutorial)",
      "href": "https://www.youtube.com/watch?v=-LFB8D9WV-g",
      "thumb": "https://i.ytimg.com/vi/-LFB8D9WV-g/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech With Lucy (YouTube)",
      "chipIds": ["vibe-coding", "ai-trends"],
      "badges": ["입문"],
      "minutesMock": 10,
      "statsMock": { "views": 184000, "likes": 5400, "comments": 420 },
      "summary": "Vibe 코딩의 '루프'를 처음부터 잡아주는 입문(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["Vibe Coding의 핵심 루프: 프롬프트→생성→검증→수정", "10분 만에 첫 MVP를 완성하는 실전 워크플로우", "AI와 협업하는 개발 패러다임 입문"],
      "radarPickReason": "184K 조회와 5.4K 좋아요의 입문 최강자. 10분 투자로 Vibe Coding 시작 가능."
    },
    {
      "id": "itm_y_cursor_vibe",
      "kind": "video",
      "title": "Cursor Vibe Coding Tutorial - For COMPLETE Beginners",
      "href": "https://www.youtube.com/watch?v=8AWEPx5cHWQ",
      "thumb": "https://i.ytimg.com/vi/8AWEPx5cHWQ/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["vibe-coding", "ai-trends"],
      "badges": ["인기"],
      "minutesMock": 18,
      "statsMock": { "views": 98000, "likes": 3100, "comments": 210 },
      "summary": "Cursor로 설치→첫 기능→수정 루프까지 따라가는 입문(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_y_n8n_agents",
      "kind": "video",
      "title": "N8N Tutorial: Building N8N AI Agents (Beginner to Pro)",
      "href": "https://www.youtube.com/watch?v=lSwMtsm6oDU",
      "thumb": "https://i.ytimg.com/vi/lSwMtsm6oDU/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["automation-n8n", "agentic-ai"],
      "badges": ["추천"],
      "minutesMock": 45,
      "statsMock": { "views": 39200, "likes": 980, "comments": 120 },
      "summary": "n8n으로 Agent 워크플로우를 단계적으로 확장(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_y_n8n_beginner_2026",
      "kind": "video",
      "title": "n8n Tutorial for Beginners 2026: How to Build AI Agents",
      "href": "https://www.youtube.com/watch?v=TKnaDGpN7Ns",
      "thumb": "https://i.ytimg.com/vi/TKnaDGpN7Ns/hqdefault.jpg",
      "source": "YouTube",
      "author": "Tech channel (YouTube)",
      "chipIds": ["automation-n8n", "agent-ops"],
      "badges": ["NEW"],
      "minutesMock": 30,
      "statsMock": { "views": 15400, "likes": 520, "comments": 44 },
      "summary": "n8n 초보자 기준: 구축→운영 관점까지(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_replit_vibe",
      "kind": "post",
      "title": "What is Vibe Coding? How To Vibe Your App to Life",
      "href": "https://blog.replit.com/what-is-vibe-coding",
      "thumb": "https://placehold.co/640x360?text=Replit+Vibe",
      "source": "Replit Blog",
      "author": "Replit",
      "chipIds": ["vibe-coding", "ai-trends"],
      "badges": ["입문"],
      "minutesMock": 8,
      "statsMock": { "views": 42000, "likes": 1200, "comments": 160 },
      "summary": "Vibe coding 개념 정의 + 실전 진행 팁(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["Vibe Coding 개념을 Replit 관점에서 정의", "앱 개발 과정에서 AI와 협업하는 실전 팁 제공", "초보자도 바로 시작할 수 있는 워크플로우 안내"],
      "radarPickReason": "Replit 공식 블로그가 정의하는 Vibe Coding. 42K 조회로 개념 정리의 정석."
    },
    {
      "id": "itm_w_stackoverflow_vibe",
      "kind": "post",
      "title": "A new worst coder has entered the chat: vibe coding without code knowledge",
      "href": "https://stackoverflow.blog/2026/01/02/a-new-worst-coder-has-entered-the-chat-vibe-coding-without-code-knowledge/",
      "thumb": "https://placehold.co/640x360?text=StackOverflow+Blog",
      "source": "Stack Overflow Blog",
      "author": "Stack Overflow",
      "chipIds": ["eval", "ai-trends"],
      "badges": ["NEW"],
      "minutesMock": 7,
      "statsMock": { "views": 56000, "likes": 2100, "comments": 330 },
      "summary": "vibe coding의 장단점/함정을 초보 관점에서 정리(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_menugen",
      "kind": "post",
      "title": "Vibe coding MenuGen",
      "href": "https://karpathy.bearblog.dev/vibe-coding-menugen/",
      "thumb": "https://placehold.co/640x360?text=MenuGen",
      "source": "bearblog",
      "author": "karpathy",
      "chipIds": ["vibe-coding", "agent-ops"],
      "badges": ["추천"],
      "minutesMock": 6,
      "statsMock": { "views": 98000, "likes": 6400, "comments": 520 },
      "summary": "로컬 데모 vs 배포 앱의 난이도 차이를 솔직히 회고(요약은 목업).",
      "lang": "en",
      "aiSummary3": ["로컬 데모와 실제 배포의 간극을 솔직하게 분석", "Vibe Coding으로 MVP 빠르게 만들되 함정 주의", "실무 적용 시 고려해야 할 현실적 이슈 정리"],
      "radarPickReason": "Karpathy의 98K 조회 회고록. Vibe Coding의 현실과 함정을 가장 솔직하게 다룸."
    },
    {
      "id": "itm_w_vibe_hell",
      "kind": "post",
      "title": "I'm in Vibe Coding Hell",
      "href": "https://blog.boot.dev/education/vibe-coding-hell/",
      "thumb": "https://placehold.co/640x360?text=Vibe+Coding+Hell",
      "source": "boot.dev",
      "author": "boot.dev",
      "chipIds": ["eval", "vibe-coding"],
      "badges": [],
      "minutesMock": 6,
      "statsMock": { "views": 31000, "likes": 940, "comments": 140 },
      "summary": "'되는 듯하다가 안 되는' vibe coding 함정 정리(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_vibe_blog_build",
      "kind": "post",
      "title": "I Built My Blog Using \"Vibe Coding\"",
      "href": "https://dev.to/thelogicwarlock/i-built-my-blog-using-vibe-coding-n66",
      "thumb": "https://placehold.co/640x360?text=dev.to+Vibe",
      "source": "dev.to",
      "author": "thelogicwarlock",
      "chipIds": ["vibe-coding", "ai-trends"],
      "badges": [],
      "minutesMock": 9,
      "statsMock": { "views": 22000, "likes": 650, "comments": 70 },
      "summary": "바이브 코딩으로 블로그를 만든 과정/실수/팁(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_datacamp_langgraph",
      "kind": "post",
      "title": "How to Build LangGraph Agents Hands-On Tutorial",
      "href": "https://www.datacamp.com/tutorial/langgraph-agents",
      "thumb": "https://placehold.co/640x360?text=DataCamp+LangGraph",
      "source": "DataCamp",
      "author": "DataCamp",
      "chipIds": ["agentic-ai", "rag-memory"],
      "badges": [],
      "minutesMock": 12,
      "statsMock": { "views": 24000, "likes": 540, "comments": 30 },
      "summary": "핸즈온으로 LangGraph 에이전트를 만드는 튜토리얼(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_devto_langgraph",
      "kind": "post",
      "title": "LangGraph Tutorial: A Comprehensive Guide to Building Advanced AI Agents",
      "href": "https://dev.to/aragorn_talks/langgraph-tutorial-a-comprehensive-guide-to-building-advanced-ai-agents-l31",
      "thumb": "https://placehold.co/640x360?text=dev.to+LangGraph",
      "source": "dev.to",
      "author": "aragorn_talks",
      "chipIds": ["agentic-ai"],
      "badges": [],
      "minutesMock": 10,
      "statsMock": { "views": 18000, "likes": 430, "comments": 22 },
      "summary": "노드/엣지/상태 관점으로 LangGraph를 설명(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_itpro_mcp",
      "kind": "post",
      "title": "What is model context protocol (MCP)?",
      "href": "https://www.itpro.com/technology/artificial-intelligence/what-is-model-context-protocol-mcp",
      "thumb": "https://placehold.co/640x360?text=ITPro+MCP",
      "source": "ITPro",
      "author": "ITPro",
      "chipIds": ["tools-mcp-api", "eval"],
      "badges": [],
      "minutesMock": 8,
      "statsMock": { "views": 12000, "likes": 260, "comments": 9 },
      "summary": "MCP 개요 + 보안/리스크 관점까지 정리(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_w_mimul_mcp",
      "kind": "post",
      "title": "Model Context Protocol(MCP)에 대해",
      "href": "https://www.mimul.com/blog/mcp/",
      "thumb": "https://placehold.co/640x360?text=Mimul+MCP",
      "source": "Mimul",
      "author": "Mimul",
      "chipIds": ["tools-mcp-api"],
      "badges": ["KOR"],
      "minutesMock": 10,
      "statsMock": { "views": 9000, "likes": 120, "comments": 8 },
      "summary": "한국어로 MCP 개념을 정리한 글(요약은 목업).",
      "lang": "ko"
    },
    {
      "id": "itm_d_n8n_tutorial",
      "kind": "doc",
      "title": "Tutorial: Build an AI workflow in n8n",
      "href": "https://docs.n8n.io/advanced-ai/intro-tutorial/",
      "thumb": "https://placehold.co/640x360?text=n8n+Tutorial",
      "source": "n8n Docs",
      "author": "n8n",
      "chipIds": ["automation-n8n", "agent-ops"],
      "badges": ["핵심"],
      "minutesMock": 12,
      "statsMock": { "views": 18000, "likes": 380, "comments": 22 },
      "summary": "공식 튜토리얼 기반: AI 워크플로우 구축 흐름(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_d_n8n_advanced_ai",
      "kind": "doc",
      "title": "n8n Advanced AI Documentation and Guides",
      "href": "https://docs.n8n.io/advanced-ai/",
      "thumb": "https://placehold.co/640x360?text=n8n+Advanced+AI",
      "source": "n8n Docs",
      "author": "n8n",
      "chipIds": ["automation-n8n", "rag-memory"],
      "badges": [],
      "minutesMock": 10,
      "statsMock": { "views": 9000, "likes": 120, "comments": 8 },
      "summary": "n8n Advanced AI 기능/가이드 허브(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_d_n8n_ai_workflow_builder",
      "kind": "doc",
      "title": "AI Workflow Builder",
      "href": "https://docs.n8n.io/advanced-ai/ai-workflow-builder/",
      "thumb": "https://placehold.co/640x360?text=n8n+AI+Workflow+Builder",
      "source": "n8n Docs",
      "author": "n8n",
      "chipIds": ["automation-n8n", "ai-trends"],
      "badges": ["NEW"],
      "minutesMock": 6,
      "statsMock": { "views": 6000, "likes": 80, "comments": 5 },
      "summary": "자연어로 워크플로우 생성/수정/디버그하는 기능 소개(요약은 목업).",
      "lang": "en"
    },
    {
      "id": "itm_k_wikidocs_langgraph",
      "kind": "doc",
      "title": "03. LangGraph를 활용한 Agent 구축",
      "href": "https://wikidocs.net/264624",
      "thumb": "https://placehold.co/640x360?text=Wikidocs+LangGraph",
      "source": "Wikidocs",
      "author": "Wikidocs",
      "chipIds": ["agentic-ai", "tools-mcp-api"],
      "badges": ["KOR"],
      "minutesMock": 10,
      "statsMock": { "views": 26000, "likes": 740, "comments": 55 },
      "summary": "한국어 LangGraph Agent 구축 튜토리얼(요약은 목업).",
      "lang": "ko"
    },
    {
      "id": "itm_k_wikidocs_langgraph_book",
      "kind": "doc",
      "title": "LangGraph 가이드북 - 에이전트 RAG with 랭그래프",
      "href": "https://wikidocs.net/book/16723",
      "thumb": "https://placehold.co/640x360?text=Wikidocs+Guidebook",
      "source": "Wikidocs",
      "author": "Wikidocs",
      "chipIds": ["rag-memory", "agentic-ai"],
      "badges": ["KOR"],
      "minutesMock": 12,
      "statsMock": { "views": 14000, "likes": 410, "comments": 19 },
      "summary": "Agentic RAG 관점의 LangGraph 가이드북(요약은 목업).",
      "lang": "ko"
    }
  ]
};

export const getItemById = (id: string): Item | undefined => {
  return mockData.items.find(item => item.id === id);
};

export const getItemsByIds = (ids: string[]): Item[] => {
  return ids.map(id => getItemById(id)).filter((item): item is Item => item !== undefined);
};

export const getChipById = (id: string): Chip | undefined => {
  return mockData.chips.find(chip => chip.id === id);
};

export const getKindLabel = (kind: Item["kind"]): string => {
  switch (kind) {
    case "video": return "영상";
    case "post": return "글";
    case "doc": return "문서";
    default: return kind;
  }
};

export const formatViews = (views: number): string => {
  if (views >= 10000) {
    return `${(views / 10000).toFixed(1)}만`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}천`;
  }
  return views.toString();
};
