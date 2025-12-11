import { useState } from "react";

export interface NotionDatabase {
  id: string;
  title: string;
  icon?: string;
  recordCount: number;
}

export interface NotionParentPage {
  id: string;
  title: string;
  databases: NotionDatabase[];
}

// Mock data for frontend demo
const mockDatabases: NotionDatabase[] = [
  { id: "db-1", title: "Projects", icon: "📁", recordCount: 24 },
  { id: "db-2", title: "Tasks", icon: "✅", recordCount: 156 },
  { id: "db-3", title: "Notes", icon: "📝", recordCount: 89 },
  { id: "db-4", title: "Bookmarks", icon: "🔖", recordCount: 42 },
  { id: "db-5", title: "Resources", icon: "📚", recordCount: 31 },
];

export function useNotionStore() {
  const [parentPage, setParentPage] = useState<NotionParentPage | null>(null);
  const [selectedDatabase, setSelectedDatabase] =
    useState<NotionDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchParentPage = async (pageId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setParentPage({
      id: pageId,
      title: `Workspace - ${pageId.slice(0, 8)}`,
      databases: mockDatabases,
    });
    setIsLoading(false);
  };

  const addUrlToDatabase = async (
    databaseId: string,
    url: string,
    title?: string,
  ) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    return { success: true, message: "URL added successfully!" };
  };

  return {
    parentPage,
    selectedDatabase,
    setSelectedDatabase,
    isLoading,
    fetchParentPage,
    addUrlToDatabase,
  };
}
