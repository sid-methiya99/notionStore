import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  handleSetup: (e: React.FormEvent) => void;
  showSuccessAnim: boolean;
  parentPageId: string;
  loading: boolean;
  setParentPageId: React.Dispatch<React.SetStateAction<string>>;
}

export const ConnectDatabase = ({
  handleSetup,
  showSuccessAnim,
  parentPageId,
  loading,
  setParentPageId,
}: Props) => {
  return (
    <div
      className={`w-full max-w-[450px] transition-all duration-500 ${showSuccessAnim ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
    >
      <Card className="border-border shadow-lg">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Database className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Connect Notion Page</CardTitle>
          <CardDescription>
            Enter the Parent Page ID to link your Notion database.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSetup}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="e.g. 142341..."
                  value={parentPageId}
                  onChange={(e) => setParentPageId(e.target.value)}
                  disabled={loading || showSuccessAnim}
                  className="text-center font-mono"
                />
                <p className="text-muted-foreground my-4 text-center text-xs">
                  You can find this in your Notion page URL.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="relative w-full overflow-hidden"
              type="submit"
              disabled={loading || showSuccessAnim}
            >
              {loading ? "Verifying..." : "Connect Database"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}

              {/* Success Overlay Button */}
              {showSuccessAnim && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-600 text-white">
                  <Check className="animate-in zoom-in h-5 w-5 duration-300" />
                  <span className="animate-in fade-in ml-2 duration-300">
                    Connected!
                  </span>
                </div>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
