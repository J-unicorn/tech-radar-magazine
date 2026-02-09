import { useState } from "react";
import { Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consentRequired, setConsentRequired] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValid = email.trim() !== "" && isValidEmail && consentRequired;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const data = {
      email,
      subscribedAtISO: new Date().toISOString(),
    };
    localStorage.setItem("techradar_newsletter", JSON.stringify(data));
    toast.success("구독 신청이 완료되었습니다. (목업)");
    setSubmitted(true);
    setEmail("");
    setConsentRequired(false);
    setConsentMarketing(false);
  };

  if (submitted) {
    return (
      <div className="card-base p-8 md:p-10 text-center">
        <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
        <h3 className="text-[18px] font-semibold text-app mb-2">구독 완료!</h3>
        <p className="text-[14px] text-muted-app">매주 월요일, 인사이트를 메일로 보내드립니다.</p>
      </div>
    );
  }

  return (
    <div className="card-base p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* Left: Headline + value props */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-accent" />
            <span className="text-[12px] font-medium text-muted-app uppercase tracking-wide">Newsletter</span>
          </div>
          <h3 className="text-[18px] md:text-[20px] leading-[26px] md:leading-[28px] font-semibold text-app mb-3">
            Tech Radar 인사이트를 메일로 받아보세요
          </h3>
          <p className="text-[14px] leading-[22px] text-muted-app mb-4">
            AI Agent &amp; Vibe Coding 트렌드를 한 번에 정리해드립니다.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span className="text-[12px] font-medium text-accent">매주 월요일 발송</span>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-10 bg-app border-app"
            />
            <Button type="submit" disabled={!isValid} className="h-10 btn-primary whitespace-nowrap">
              무료로 구독하기
            </Button>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent_required"
                checked={consentRequired}
                onCheckedChange={(checked) => setConsentRequired(checked as boolean)}
              />
              <label
                htmlFor="consent_required"
                className="text-[13px] text-app cursor-pointer"
              >
                개인정보 수집·이용 동의<span className="text-destructive ml-1">*</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent_marketing"
                checked={consentMarketing}
                onCheckedChange={(checked) => setConsentMarketing(checked as boolean)}
              />
              <label
                htmlFor="consent_marketing"
                className="text-[13px] text-muted-app cursor-pointer"
              >
                마케팅 정보 수신 동의(선택)
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
