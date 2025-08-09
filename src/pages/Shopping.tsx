import { useSEO } from "@/hooks/useSEO";
import { usePlanner } from "@/hooks/usePlanner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Shopping = () => {
  useSEO({
    title: "Shopping List – Dinner Planner",
    description: "Your consolidated shopping list grouped by aisle order.",
    canonical: window.location.origin + "/shopping",
  });

  const { missingAggregated } = usePlanner();

  const copyList = async () => {
    const text = missingAggregated
      .map((i) => `${i.name} – ${i.quantity}${i.unit ? ` ${i.unit}` : ""}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Shopping list copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy to clipboard.", variant: "destructive" as any });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      <section className="space-y-2">
        {missingAggregated.map((i) => (
          <div key={`${i.name}|${i.unit}`} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
            <span className="text-sm">{i.name}</span>
            <span className="text-sm text-muted-foreground">{i.quantity}{i.unit ? ` ${i.unit}` : ""}</span>
          </div>
        ))}
        {missingAggregated.length === 0 && (
          <p className="text-sm text-muted-foreground">You're all set! Nothing to buy.</p>
        )}
      </section>

      <div className="mt-6 flex gap-2">
        <Button onClick={copyList} disabled={missingAggregated.length === 0}>Copy list</Button>
      </div>
    </div>
  );
};

export default Shopping;
