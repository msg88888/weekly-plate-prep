import { useSEO } from "@/hooks/useSEO";

const Check = () => {
  useSEO({
    title: "Ingredient Check – Dinner Planner",
    description: "Toggle what you already have for each dish before shopping.",
    canonical: window.location.origin + "/check",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ingredient Check</h2>
      <p className="text-muted-foreground">Coming next: mark ingredients Yes/No and persist your checks.</p>
    </div>
  );
};

export default Check;
