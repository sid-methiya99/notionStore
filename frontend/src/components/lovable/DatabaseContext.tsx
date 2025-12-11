import { useState } from "react";
import { type NotionDatabase } from "@/hooks/use-notion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Database, Link, Plus, CheckCircle2 } from "lucide-react";

interface DatabaseContentProps {
  database: NotionDatabase | null;
  onAddUrl: (
    databaseId: string,
    url: string,
    title?: string,
  ) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
}

export function DatabaseContent({
  database,
  onAddUrl,
  isLoading,
}: DatabaseContentProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  // const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!database || !url.trim()) return;

    const result = await onAddUrl(
      database.id,
      url.trim(),
      title.trim() || undefined,
    );

    if (result.success) {
      // toast({
      //   title: "URL Added",
      //   description: result.message,
      // });
      setUrl("");
      setTitle("");
    } else {
      // toast({
      //   title: "Error",
      //   description: result.message,
      //   variant: "destructive",
      // });
    }
  };

  if (!database) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md space-y-4 text-center">
          <div className="bg-muted inline-flex h-16 w-16 items-center justify-center rounded-2xl">
            <Database className="text-muted-foreground h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Select a Database</h2>
          <p className="text-muted-foreground">
            Choose a database from the sidebar to start adding URL records
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 overflow-auto p-6">
      {/* Database header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{database.icon || "📄"}</span>
          <h1 className="text-2xl font-bold">{database.title}</h1>
        </div>
        <p className="text-muted-foreground">
          {database.recordCount} records in this database
        </p>
      </div>

      {/* Add URL form */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="text-primary h-5 w-5" />
            Add New URL Record
          </CardTitle>
          <CardDescription>
            Add a new URL entry to your {database.title} database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <div className="relative">
                <Link className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background/50 pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                type="text"
                placeholder="Give this URL a name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={!url.trim() || isLoading}
            >
              {isLoading ? (
                "Adding..."
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Add to Database
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent additions placeholder */}
    </div>
  );
}
