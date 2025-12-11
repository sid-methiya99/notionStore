import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/lovable/AppSidebar2";
import { DatabaseContent } from "@/components/lovable/DatabaseContext";
import { useNotionStore } from "@/hooks/use-notion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database } from "lucide-react";

export default function Browser() {
  const navigate = useNavigate();
  const {
    parentPage,
    selectedDatabase,
    setSelectedDatabase,
    isLoading,
    fetchParentPage,
    addUrlToDatabase,
  } = useNotionStore();

  useEffect(() => {
    const pageId = localStorage.getItem("notion-page-id");
    if (!pageId) {
      navigate("/");
      return;
    }
    fetchParentPage(pageId);
  }, []);

  const handleBack = () => {
    localStorage.removeItem("notion-page-id");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          parentPage={parentPage}
          selectedDatabase={selectedDatabase}
          onSelectDatabase={setSelectedDatabase}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="border-border bg-background/50 sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-4 backdrop-blur-sm">
            <SidebarTrigger className="h-8 w-8" />
            <div className="bg-border h-4 w-px" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <div className="flex-1" />
            {parentPage && (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {parentPage.databases.length} databases
                </span>
              </div>
            )}
          </header>

          {/* Main content */}
          {isLoading && !parentPage ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="bg-primary/20 mx-auto h-12 w-12 animate-pulse rounded-xl" />
                <p className="text-muted-foreground">Loading workspace...</p>
              </div>
            </div>
          ) : (
            <DatabaseContent
              database={selectedDatabase}
              onAddUrl={addUrlToDatabase}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
