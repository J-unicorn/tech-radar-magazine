import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { techInsightMock } from "@/data/techInsightMock";

export default function InsightReportPage() {
  return (
    <div className="min-h-screen bg-app">
      {/* Back navigation */}
      <div className="max-w-[700px] mx-auto container-padding pt-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-muted-app hover:text-app -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </Link>
      </div>

      {/* Main report container */}
      <div className="max-w-[700px] mx-auto container-padding pb-12">
        <article className="border border-app rounded-xl overflow-hidden bg-surface">
          {/* Header block */}
          <header 
            className="px-10 py-8"
            style={{ backgroundColor: "#00205b" }}
          >
            <p className="text-[12px] uppercase tracking-wider text-white/70 mb-2">
              {techInsightMock.kicker}
            </p>
            <h1 className="text-[24px] leading-[32px] font-bold text-white mb-3">
              {techInsightMock.title}
            </h1>
            <p className="text-[14px] leading-[22px] text-muted-app">
              {techInsightMock.subtitle}
            </p>
          </header>

          {/* Content */}
          <div className="px-10 py-8 space-y-8">
            {/* Executive Summary */}
            <section>
              <SectionHeader>Executive Summary</SectionHeader>
              
              <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4">
                <p className="text-[14px] leading-[22px] italic text-app">
                  "{techInsightMock.executiveQuote}"
                </p>
              </blockquote>

              <ul className="space-y-2">
                {techInsightMock.executiveBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] leading-[22px] text-app">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </section>

            {/* Trade-off Table */}
            <section>
              <SectionHeader>Trade-off Analysis</SectionHeader>
              
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-app">
                      {techInsightMock.tradeoffTable.headers.map((header, idx) => (
                        <th 
                          key={idx}
                          className={`px-4 py-3 text-left font-semibold ${
                            idx === 2 ? "text-[#b91c1c]" : "text-app"
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {techInsightMock.tradeoffTable.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border-b border-app">
                        {row.map((cell, cellIdx) => (
                          <td 
                            key={cellIdx}
                            className={`px-4 py-3 ${
                              cellIdx === 0 ? "font-medium text-app" : "text-muted-app"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recommendation */}
            <section>
              <SectionHeader>{techInsightMock.recommendation.title}</SectionHeader>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-app border border-app">
                  <h4 className="text-[14px] font-semibold text-app mb-2">
                    {techInsightMock.recommendation.leftTitle}
                  </h4>
                  <p className="text-[13px] text-muted-app">
                    {techInsightMock.recommendation.leftBody}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-app border border-app">
                  <h4 className="text-[14px] font-semibold text-app mb-2">
                    {techInsightMock.recommendation.rightTitle}
                  </h4>
                  <p className="text-[13px] text-muted-app">
                    {techInsightMock.recommendation.rightBody}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer CTA */}
          <footer className="px-10 py-6 border-t border-app">
            <Button 
              className="w-full h-12 text-[14px] font-medium"
              style={{ backgroundColor: "#00205b" }}
            >
              {techInsightMock.ctaLabel}
            </Button>
          </footer>
        </article>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 
      className="text-[14px] uppercase tracking-wide font-semibold mb-4 pb-2 border-b-2"
      style={{ 
        color: "#00205b",
        borderColor: "#00205b"
      }}
    >
      {children}
    </h3>
  );
}
