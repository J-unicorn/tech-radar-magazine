import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mockData, Chip } from "@/data/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  activeTab: "new" | "popular";
  onTabChange: (tab: "new" | "popular") => void;
  activeChipId: string | null;
  onChipChange: (chipId: string | null) => void;
}

const navItems = [
  { label: "콘텐츠", href: "/" },
  { label: "프로덕트 밸리", href: "/" },
  { label: "크리에이터", href: "/" },
  { label: "컬렉션", href: "/" },
  { label: "물어봐 AI", href: "/" },
  { label: "놀이터", href: "/" },
];

export function Header({ activeTab, onTabChange, activeChipId, onChipChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Main header row */}
      <div className="container-padding">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">Tech Radar</span>
              <span className="hidden sm:inline text-xs text-muted-foreground">AI Agent & Vibe Coding</span>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2">
                광고 상품
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2">
                크리에이터 지원
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2">
                로그인
              </Link>
              <Button size="sm" className="ml-2">
                회원가입
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-padding py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link to="/" className="text-sm text-muted-foreground px-3 py-2">광고 상품</Link>
              <Link to="/" className="text-sm text-muted-foreground px-3 py-2">크리에이터 지원</Link>
              <Link to="/" className="text-sm text-muted-foreground px-3 py-2">로그인</Link>
              <Button size="sm" className="mx-3 mt-2">회원가입</Button>
            </div>
          </nav>
        </div>
      )}

      {/* Sub nav row */}
      <div className="border-t border-border bg-background">
        <div className="container-padding">
          <div className="flex items-center gap-4 h-12 max-w-7xl mx-auto">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "new" | "popular")}>
              <TabsList className="bg-transparent h-auto p-0 gap-1">
                <TabsTrigger
                  value="new"
                  className="px-3 py-1.5 text-sm font-medium rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  새로 나온
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="px-3 py-1.5 text-sm font-medium rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  인기
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Chips */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="w-full">
                <div className="flex items-center gap-2 pb-2">
                  {mockData.chips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => onChipChange(activeChipId === chip.id ? null : chip.id)}
                      className={`chip whitespace-nowrap ${activeChipId === chip.id ? "chip-active" : ""}`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
