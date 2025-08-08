import { useSEO } from "@/hooks/useSEO";

const Settings = () => {
  useSEO({
    title: "Settings – Dinner Planner",
    description: "Configure week start, aisle order, and default email.",
    canonical: window.location.origin + "/settings",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-muted-foreground">Coming next: reorder categories and set preferences.</p>
    </div>
  );
};

export default Settings;
