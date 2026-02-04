export const techInsightMock = {
  kicker: "Technology Analysis Report",
  title: "Next.js 15: 컴파일러 혁신과 기업형 도입 전략",
  subtitle: "분석 대상: 유튜브 기술 세션 12개 및 전문가 리뷰 45건 종합",
  executiveQuote: "React Compiler의 도입으로 런타임 최적화 부담은 줄었으나, 빌드 타임의 인프라 비용 최적화가 새로운 핵심 과제로 부상함",
  executiveBullets: [
    "자동 메모이제이션 기능으로 개발 생산성 약 25% 향상 기대",
    "기존 하이드레이션 병목 현상을 해결하는 부분 사전 렌더링(PPR) 공식 지원",
    "대규모 모노레포 환경에서의 빌드 파이프라인 부하 증가 주의 필요"
  ],
  tradeoffTable: {
    headers: ["Key Dimension", "Value Proposition (이점)", "Risk & Challenge (리스크)"],
    rows: [
      ["Performance", "TBT(Total Blocking Time) 40% 감소", "초기 빌드 시 CPU 리소스 점유율 상승"],
      ["Architecture", "서버/클라이언트 컴포넌트 경계 명확화", "Caching 전략 전면 수정 필요 (Breaking Change)"],
      ["Developer Exp.", "useMemo/useCallback 수동 최적화 제거", "컴파일러 오류 발생 시 원인 파악 난이도 상승"]
    ]
  },
  recommendation: {
    title: "McKinsey Style Recommendation",
    leftTitle: "신규 프로젝트",
    leftBody: "무조건 도입 권장. 최신 캐싱 패턴을 초기부터 적용하여 생산성 극대화.",
    rightTitle: "기존 서비스",
    rightBody: "점진적 전환 권장. 특정 모듈부터 Compiler를 부분 적용하며 Side-effect 검증 필수."
  },
  ctaLabel: "원문 분석 영상 및 데이터 확인하기"
};
