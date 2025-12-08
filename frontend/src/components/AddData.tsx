import { Plus, Check, ArrowRight, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  returnTitleAndId: string[] | [];
}

export const AddData = ({
  loading,
  handleSubmit,
  value,
  setValue,
  category,
  setCategory,
  returnTitleAndId,
}: Props) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards w-full max-w-[600px] space-y-8 duration-600 ease-out">
      <div className="relative flex flex-col space-y-2 text-center">
        {/* <Button */}
        {/*   variant="ghost" */}
        {/*   size="sm" */}
        {/*   className="text-muted-foreground hover:text-foreground absolute -top-12 right-0" */}
        {/*   onClick={handleReset} */}
        {/* > */}
        {/*   <Settings className="mr-2 h-4 w-4" /> Settings */}
        {/* </Button> */}

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Manage your store
        </h1>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
          Database linked. Add items quickly below.
        </p>
      </div>

      <div className="bg-card text-card-foreground mx-auto max-w-sm rounded-xl border shadow-sm">
        <div className="p-6 pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex-1">
              <Input
                placeholder="What needs to be done?"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-10"
                autoFocus
              />
            </div>

            {returnTitleAndId?.length > 0 && (
              <div className="h-full w-full">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {returnTitleAndId?.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Handle edge case where select is empty */}

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
        {returnTitleAndId.length === 0 && (
          <p className="text-muted-foreground mb-2 px-2 text-center text-sm">
            Please enter a database in your parent page
          </p>
        )}
        <div className="lg:px-6 lg:pb-6">
          <p className="text-muted-foreground hidden text-[0.8rem] lg:block">
            Press{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              Enter
            </kbd>{" "}
            to submit automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
