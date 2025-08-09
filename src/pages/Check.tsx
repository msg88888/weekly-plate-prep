import { useSEO } from "@/hooks/useSEO";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePlanner } from "@/hooks/usePlanner";

const Check = () => {
  useSEO({
    title: "Ingredient Check – Dinner Planner",
    description: "Toggle what you already have for each dish before shopping.",
    canonical: window.location.origin + "/check",
  });

  const { allIngredients, haveMap, setHaveMap } = usePlanner();

  const grouped = useMemo(() => {
    const map = new Map<string, { dishName: string; items: { id: string; label: string }[] }>();
    for (const { dishName, ingredient } of allIngredients) {
      if (!map.has(dishName)) map.set(dishName, { dishName, items: [] });
      map.get(dishName)!.items.push({
        id: ingredient.id,
        label: `${ingredient.name}${ingredient.quantity ? ` – ${ingredient.quantity}` : ""}${ingredient.unit ? ` ${ingredient.unit}` : ""}`,
      });
    }
    return Array.from(map.values());
  }, [allIngredients]);

  const toggle = (id: string) => setHaveMap({ ...haveMap, [id]: !haveMap[id] });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ingredient Check</h1>
      <section className="space-y-5">
        {grouped.map((group) => (
          <article key={group.dishName} className="rounded-lg border border-border bg-card">
            <header className="px-4 py-3 border-b border-border">
              <h2 className="text-base font-semibold">{group.dishName}</h2>
            </header>
            <div className="p-4 space-y-2">
              {group.items.map((item) => (
                <label key={item.id} className="flex items-center gap-3 text-sm">
                  <Checkbox checked={!!haveMap[item.id]} onCheckedChange={() => toggle(item.id)} />
                  <span className={haveMap[item.id] ? "line-through text-muted-foreground" : ""}>{item.label}</span>
                </label>
              ))}
              {group.items.length === 0 && (
                <p className="text-sm text-muted-foreground">No ingredients.</p>
              )}
            </div>
          </article>
        ))}
        {grouped.length === 0 && (
          <p className="text-sm text-muted-foreground">Add dishes to the week in Planner first.</p>
        )}
      </section>

      <div className="mt-6">
        <Button asChild>
          <Link to="/shopping">Continue to Shopping List</Link>
        </Button>
      </div>
    </div>
  );
};

export default Check;
