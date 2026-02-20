import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Adopt from "./pages/Adopt";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Shop from "./pages/Shop";
import News from "./pages/News";
import NewsPost from "./pages/NewsPost";
import Foster from "./pages/Foster";
import AdminDashboard from "./pages/AdminDashboard";
import MatchingGifts from "./pages/MatchingGifts";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/adopt" component={Adopt} />
      <Route path="/get-involved" component={GetInvolved} />
      <Route path="/foster" component={Foster} />
      <Route path="/donate" component={Donate} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/shop" component={Shop} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsPost} />
      {/* Unlisted page — not in nav, linked from Double the Donation emails */}
      <Route path="/matching-gifts" component={MatchingGifts} />
      {/* Admin panel — protected, admin role only */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/:section" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
