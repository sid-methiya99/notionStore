import { Button } from "@/components/ui/button";
import Google from "../assets/google.svg";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173",
    });
  };

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4">
      <h1 className="mb-10 text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
        Sign in to notionStore
      </h1>
      <div className="text-card-foreground relative w-full max-w-sm rounded-xl border bg-neutral-900 p-8 shadow-lg">
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="hover:bg-primary-foreground relative h-10 w-full cursor-pointer"
            onClick={onSubmit}
          >
            <img src={Google} className="mr-2 size-5" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
