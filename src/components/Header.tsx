import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mockData } from "@/data/mockData";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  activeTab: "new" | "popular";
  onTabChange: (tab: "new" | "popular") => void;
  activeChipId: string | null;
  onChipChange: (chipId: string | null) => void;
}

export function Header({ activeTab, onTabChange, activeChipId, onChipChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChipClick = (chipId: string) => {
    // Navigate to tag page instead of filtering in place
    navigate(`/tag/${chipId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-app">
      {/* Main header row - 72px height */}
      <div className="container-padding">
        <div className="flex items-center justify-between h-[72px] max-w-[1200px] mx-auto">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-[22px] leading-[28px] font-semibold text-app">Tech Radar</span>
              <span className="hidden sm:inline text-[12px] leading-[18px] text-muted-app">AI Agent & Vibe Coding</span>
            </Link>
          </div>

          {/* Right: Actions - NO CENTER NAV */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-app hover:text-app">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-app hover:text-app" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className="text-[14px] leading-[22px] text-muted-app hover:text-app transition-colors px-2">
                로그인
              </Link>
              <Button 
                size="sm" 
                className="ml-2 h-10 px-4 btn-primary"
              >
                회원가입
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-app"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-app bg-surface animate-fade-in">
          <nav className="container-padding py-4 flex flex-col gap-2">
            <Link to="/" className="text-[14px] text-muted-app px-3 py-2">로그인</Link>
            <Button size="sm" className="mx-3 mt-2 btn-primary">회원가입</Button>
          </nav>
        </div>
      )}

      {/* Sub nav row - 56px height */}
      <div className="border-t border-app bg-surface">
        <div className="container-padding">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 h-auto md:h-[56px] py-3 md:py-0 max-w-[1200px] mx-auto">
            {/* Tabs - Left */}
            <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "new" | "popular")} className="flex-shrink-0">
              <TabsList className="bg-transparent h-auto p-0 gap-1">
                <TabsTrigger
                  value="new"
                  className="px-4 py-2 text-[14px] font-medium rounded-full transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-app"
                >
                  새로 나온
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="px-4 py-2 text-[14px] font-medium rounded-full transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-app"
                >
                  인기
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Chips - Right */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="w-full">
                <div className="flex items-center gap-2 pb-2 md:pb-0">
                  {mockData.chips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip.id)}
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
