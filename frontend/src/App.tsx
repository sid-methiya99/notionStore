import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Make sure to use "sonner" directly or the shadcn wrapper
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./components/lovable/pages/Landing";
import Browser from "./components/lovable/pages/Browser";
import NotFound from "./components/lovable/pages/NotFound";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <div className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground min-h-screen font-sans antialiased">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/browser" element={<Browser />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
