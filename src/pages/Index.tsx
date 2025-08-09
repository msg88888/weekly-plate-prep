import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const Index = () => {
  useSEO({
    title: "Dinner Planner – Weekly meal planning",
    description: "Plan your week, check ingredients, and build a shopping list.",
    canonical: window.location.origin + "/",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Planner</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {days.map((d) => (
          <div key={d} className="rounded-lg border border-border p-3 bg-card">
            <div className="text-sm text-muted-foreground mb-2">{d}</div>
            <button className="w-full rounded-md border border-dashed border-border py-6 text-sm text-muted-foreground hover:text-foreground">
              + Add dish
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to="/check"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
        >
          Generate List
        </Link>
      </div>
    </div>
  );
};

export default Index;
