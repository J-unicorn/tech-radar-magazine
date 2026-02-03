import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { mockData } from "@/data/mockData";

export function NewsletterSection() {
  const { newsletter } = mockData.layout;
  const [email, setEmail] = useState("");
  const [consents, setConsents] = useState<Record<string, boolean>>({
    c_all: false,
    c_1: false,
    c_2: false,
    c_3: false,
  });

  const requiredConsent = newsletter.consents.find(c => c.required);
  const isValid = email.trim() !== "" && requiredConsent && consents[requiredConsent.id];

  const handleAllConsent = (checked: boolean) => {
    const newConsents: Record<string, boolean> = {};
    newsletter.consents.forEach(c => {
      newConsents[c.id] = checked;
    });
    setConsents(newConsents);
  };

  const handleConsentChange = (id: string, checked: boolean) => {
    const newConsents = { ...consents, [id]: checked };
    
    // Update "all" checkbox based on individual checkboxes
    const nonAllConsents = newsletter.consents.filter(c => c.id !== "c_all");
    const allChecked = nonAllConsents.every(c => newConsents[c.id]);
    newConsents.c_all = allChecked;
    
    setConsents(newConsents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      alert("구독 신청이 완료되었습니다!");
      setEmail("");
      setConsents({ c_all: false, c_1: false, c_2: false, c_3: false });
    }
  };

  return (
    <section className="section-padding">
      <div className="container-padding max-w-[1200px] mx-auto">
        <div className="bg-surface rounded-3xl p-8 md:p-12 lg:p-16 border border-app">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-accent" />
                <span className="text-[12px] font-medium text-muted-app">Tech Radar 뉴스레터</span>
              </div>
              <h2 className="text-[20px] md:text-[24px] leading-[28px] md:leading-[32px] font-semibold text-app whitespace-pre-line">
                Tech Radar가 고른 실무 인사이트를 매주 목요일에
              </h2>
              <p className="mt-4 text-[14px] text-muted-app">{newsletter.subscriberCountLabel}</p>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="bg-app rounded-2xl p-6 md:p-8 border border-app">
              <div className="flex gap-2 mb-6">
                <Input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-10 bg-surface border-app"
                />
                <Button type="submit" disabled={!isValid} className="h-10 btn-primary">
                  무료로 구독하기
                </Button>
              </div>

              <div className="space-y-3">
                {newsletter.consents.map((consent) => (
                  <div key={consent.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={consent.id}
                      checked={consents[consent.id] || false}
                      onCheckedChange={(checked) => {
                        if (consent.id === "c_all") {
                          handleAllConsent(checked as boolean);
                        } else {
                          handleConsentChange(consent.id, checked as boolean);
                        }
                      }}
                    />
                    <label
                      htmlFor={consent.id}
                      className={`text-[14px] cursor-pointer ${
                        consent.id === "c_all" ? "font-medium text-app" : "text-muted-app"
                      }`}
                    >
                      {consent.label}
                      {consent.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
