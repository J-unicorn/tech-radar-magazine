import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { WipProvider } from "@/contexts/WipContext";
import Index from "./pages/Index";
import ContentDetail from "./pages/ContentDetail";
import CollectionDetail from "./pages/CollectionDetail";
import CreatorDetail from "./pages/CreatorDetail";
import TagPage from "./pages/TagPage";
import InsightReportPage from "./pages/InsightReportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
       <BrowserRouter>
         <WipProvider>
           <Toaster />
           <Sonner />
           <Routes>
             <Route path="/" element={<Index />} />
             <Route path="/content/:id" element={<ContentDetail />} />
             <Route path="/collections/:id" element={<CollectionDetail />} />
             <Route path="/creators/:id" element={<CreatorDetail />} />
             <Route path="/tag/:chipId" element={<TagPage />} />
             <Route path="/insight" element={<InsightReportPage />} />
             <Route path="/techinsight" element={<InsightReportPage />} />
             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
             <Route path="*" element={<NotFound />} />
           </Routes>
         </WipProvider>
       </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
