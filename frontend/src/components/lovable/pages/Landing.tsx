import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, ArrowRight, Sparkles } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lovable/AppSidebar2";
import { cn } from "@/lib/utils";

export default function Landing() {
  const [pageId, setPageId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageId.trim()) {
      localStorage.setItem("notion-page-id", pageId.trim());
      navigate("/browser");
    }
  };

  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-full">
        <AppSidebar
          parentPage={null}
          selectedDatabase={null}
          onSelectDatabase={() => {}}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
          {/* Sidebar trigger for mobile */}
          <div className="absolute top-[18px] left-4 z-20">
            <SidebarTrigger />
          </div>

          {/* Background effects */}
          <div className="from-background via-background to-accent/20 absolute inset-0 bg-linear-to-br" />
          {/* <div className="bg-primary/5 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl" /> */}
          {/* <div className="bg-primary/10 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" /> */}

          <div className="relative z-10 w-full max-w-lg space-y-8">
            {/* Logo and title */}
            <div className="space-y-4 text-center">
              <div className="bg-primary/10 border-primary/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border">
                <Database className="text-primary h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">OrgNote</h1>
              <p className="text-muted-foreground text-lg">
                Connect your Notion workspace and manage your databases with
                ease
              </p>
            </div>

            {/* Main card */}
            <Card className="bg-background border-foreground/80">
              <CardHeader className="pb-4 text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Sparkles className="text-primary h-5 w-5" />
                  Get Started
                </CardTitle>
                <CardDescription>
                  Enter your Notion parent page ID to explore its databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="e.g., a1b2c3d4-e5f6-7890-abcd-ef1234567890"
                      value={pageId}
                      onChange={(e) => setPageId(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 h-12 transition-colors"
                    />
                    <p className="text-muted-foreground text-xs">
                      Find this in your Notion page URL after the workspace name
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className={cn(
                      "h-12 w-full text-base font-medium",
                      !pageId.trim() && "bg-foreground/80",
                    )}
                    disabled={!pageId.trim()}
                  >
                    Connect to Notion
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* <div className="grid grid-cols-3 gap-4 text-center"> */}
            {/*   {[ */}
            {/*     { label: "Browse", desc: "Databases" }, */}
            {/*     { label: "Add", desc: "URL Records" }, */}
            {/*     { label: "Manage", desc: "Content" }, */}
            {/*   ].map((feature) => ( */}
            {/*     <div */}
            {/*       key={feature.label} */}
            {/*       className="bg-secondary/30 rounded-lg p-3" */}
            {/*     > */}
            {/*       <p className="text-sm font-medium">{feature.label}</p> */}
            {/*       <p className="text-muted-foreground text-xs"> */}
            {/*         {feature.desc} */}
            {/*       </p> */}
            {/*     </div> */}
            {/*   ))} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
