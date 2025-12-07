import { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { useSession } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { ConnectDatabase } from "@/components/ConnectDatabase";
import { AddData } from "@/components/AddData";
import { useMutation } from "@tanstack/react-query";
import { sendPageId } from "@/lib/mutations";

export default function Home() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [parentPageId, setParentPageId] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  const mutation = useMutation({
    mutationFn: sendPageId,
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        setShowSuccessAnim(false);
        setIsConfigured(true);
        toast.success("Database Connected", {
          description: "You can now add items to your store.",
        });
      }, 1500);
    },
    onError: (e) => {
      toast.error(e as any);
    },
  });

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentPageId) {
      toast.error("Please enter a Page ID");
      return;
    }

    mutation.mutate({ pageId: parentPageId });

    setShowSuccessAnim(true);
  };

  // Handle Item Addition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value || !category) {
      toast.error("Validation Error", {
        description: "Please enter both an item and a category.",
      });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("Content Added", {
      description: `${value} has been saved to ${category}.`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });

    setValue("");
    setLoading(false);
  };

  // Helper to reset configuration (for demo purposes)
  const handleReset = () => {
    setIsConfigured(false);
    setParentPageId("");
  };

  if (isPending) return null; // Or a loading spinner

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <Navbar />

      <div className="relative container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
        {!isConfigured && (
          <ConnectDatabase
            parentPageId={parentPageId}
            handleSetup={handleSetup}
            setParentPageId={setParentPageId}
            loading={loading}
            showSuccessAnim={showSuccessAnim}
          />
        )}

        {isConfigured && (
          <AddData
            loading={loading}
            value={value}
            setValue={setValue}
            category={category}
            setCategory={setCategory}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
