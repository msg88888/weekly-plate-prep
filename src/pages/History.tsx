import { useSEO } from "@/hooks/useSEO";

const History = () => {
  useSEO({
    title: "History – Dinner Planner",
    description: "Past weekly plans at a glance.",
    canonical: window.location.origin + "/history",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <p className="text-muted-foreground">Coming next: previous WeekPlans with dishes.</p>
    </div>
  );
};

export default History;
