import { Link } from "react-router-dom";
import { Moon, Sun, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { signOut, useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Common Theme Toggle Component to reuse in Desktop and Mobile
  const ThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Optional: Add a small icon next to text for polish */}
          <Package2 className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">notionStore</span>
        </Link>

        {/* --- DESKTOP VIEW (Hidden on Mobile) --- */}
        <div className="hidden items-center gap-2 md:flex">
          {session && (
            <p className="text-muted-foreground text-sm">
              Hello,
              <span className="text-foreground ml-1 font-medium">
                {session.user.name}
              </span>
            </p>
          )}

          <ThemeToggle />

          {session ? (
            <Button size="sm" className="font-medium" onClick={() => signOut()}>
              Log out
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="font-medium">
                Log in
              </Button>
            </Link>
          )}
        </div>

        {/* --- MOBILE VIEW (Hamburger) --- */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Package2 className="h-5 w-5" />
                  <span className="text-lg font-bold tracking-tight">
                    notionStore
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 px-4">
                {session ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Signed in as</p>
                      <p className="truncate font-medium">
                        {session.user.name}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Log in</Button>
                  </Link>
                )}

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-muted-foreground text-sm">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
