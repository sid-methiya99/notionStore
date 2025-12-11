import { ChevronDown, FileText, Moon, Package2, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { NotionParentPage, NotionDatabase } from "@/hooks/use-notion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "../theme-provider";
import { Link } from "react-router-dom";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
};

interface AppSidebarProps {
  parentPage: NotionParentPage | null;
  selectedDatabase: NotionDatabase | null;
  onSelectDatabase: (db: NotionDatabase) => void;
}

export function AppSidebar({
  parentPage,
  selectedDatabase,
  onSelectDatabase,
}: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const FooterContent = () => (
    <SidebarFooter className="border-sidebar-border border-t p-2">
      <div
        className={cn(
          "flex items-center",
          isCollapsed ? "flex-col gap-2" : "justify-between",
        )}
      >
        <div
          className={cn("flex items-center gap-2", isCollapsed && "flex-col")}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {mockUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <p className="text-sm leading-none font-medium">
                {mockUser.name}
              </p>
              <p className="text-muted-foreground text-xs">{mockUser.email}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </SidebarFooter>
  );

  if (!parentPage) {
    return (
      <Sidebar className="border-black dark:border-white/80">
        <SidebarContent className="pt-3">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 gap-x-4 px-4">
              <Link to="/" className="flex">
                <Package2 className="h-6 w-6" />
                <span className="text-lg font-semibold">OrgNote</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarContent>
        <FooterContent />
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-black dark:border-white/40">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="h-10 gap-x-4 px-4">
            <div className="mt-1 flex">
              <Package2 className="h-6 w-6" />
              <span className="text-lg font-semibold">OrgNote</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="pt-3.5">
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="hover:bg-sidebar-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate font-medium">
                      {parentPage.title}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {parentPage.databases.map((db) => (
                    <SidebarMenuItem key={db.id}>
                      <SidebarMenuButton
                        onClick={() => onSelectDatabase(db)}
                        className={cn(
                          "w-full justify-start",
                          selectedDatabase?.id === db.id &&
                            "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                        tooltip={db.title}
                      >
                        <span className="shrink-0">{db.icon || "📄"}</span>
                        {!isCollapsed && (
                          <>
                            <span className="truncate">{db.title}</span>
                            <span className="text-muted-foreground ml-auto text-xs">
                              {db.recordCount}
                            </span>
                          </>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <FooterContent />
    </Sidebar>
  );
}
