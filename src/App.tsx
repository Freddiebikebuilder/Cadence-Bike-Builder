import Index from './pages/Index';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BikeProvider } from "./contexts/BikeContext";
import FrameSelection from "./pages/FrameSelection";
import BikeBuilder from "./pages/BikeBuilder";
import BuildSummary from "./pages/BuildSummary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BikeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/frame-selection" element={<FrameSelection />} /> 
            <Route path="/build" element={<BikeBuilder />} />
            <Route path="/summary" element={<BuildSummary />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BikeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
