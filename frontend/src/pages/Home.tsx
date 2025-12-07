import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useSession } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || !category) {
      toast.error("Validation Error", {
        description: "Please enter both an item and a category.",
      });
      return;
    }

    setLoading(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("Content Added", {
      description: `${value} has been saved to ${category}.`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });

    setValue("");
    setCategory("");
    setLoading(false);
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="relative container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-[600px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Manage your store
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              Add items to your Notion database quickly and efficiently.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
            <div className="p-6 pt-6">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <div className="flex-1">
                  <Input
                    placeholder="What needs to be done?"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="w-full md:w-40">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="h-10 px-6">
                  {loading ? (
                    "Adding..."
                  ) : (
                    <>
                      Add <Plus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            <div className="px-6 pb-6">
              <p className="text-muted-foreground text-[0.8rem]">
                Press{" "}
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                  Enter
                </kbd>{" "}
                to submit automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
