import { useSEO } from "@/hooks/useSEO";

const Shopping = () => {
  useSEO({
    title: "Shopping List – Dinner Planner",
    description: "Your consolidated shopping list grouped by aisle order.",
    canonical: window.location.origin + "/shopping",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      <p className="text-muted-foreground">Coming next: grouped checklist with Email and Copy actions.</p>
    </div>
  );
};

export default Shopping;
