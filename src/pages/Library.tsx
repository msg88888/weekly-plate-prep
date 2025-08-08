import { useSEO } from "@/hooks/useSEO";

const Library = () => {
  useSEO({
    title: "Dishes Library – Dinner Planner",
    description: "Browse and manage dishes with ingredients.",
    canonical: window.location.origin + "/library",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dishes Library</h2>
      <p className="text-muted-foreground">Coming next: CRUD for dishes and ingredients with search.</p>
    </div>
  );
};

export default Library;
