import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { X, Plus } from "lucide-react";
import { usePlanner } from "@/hooks/usePlanner";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  useSEO({
    title: "Dinner Planner – Weekly meal planning",
    description: "Plan your week, check ingredients, and build a shopping list.",
    canonical: window.location.origin + "/",
  });

  const { days, plan, dishes, dishesById, addDishToDay, removeDishFromDay, moveDish, clearPlan } = usePlanner();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredDishes = useMemo(
    () =>
      dishes.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())),
    [dishes, search]
  );

  const openPicker = (day: string) => {
    setActiveDay(day);
    setPickerOpen(true);
  };

  const onDropDish = (e: React.DragEvent<HTMLElement>, targetDay: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;
    try {
      const { dishId, fromDay, index } = JSON.parse(data) as {
        dishId: string;
        fromDay: string;
        index: number;
      };
      if (dishId && fromDay) {
        moveDish(fromDay as any, targetDay as any, dishId, index);
      }
    } catch {}
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Weekly Planner</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearPlan}>Clear Week</Button>
          <Button asChild>
            <Link to="/check">Generate List</Link>
          </Button>
        </div>
      </header>

      <section aria-label="Week days" className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {days.map((d) => (
          <article
            key={d}
            className="rounded-lg border border-border p-3 bg-card"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropDish(e, d)}
          >
            <div className="text-sm text-muted-foreground mb-2">{d}</div>
            <div className="space-y-2 min-h-16">
              {plan[d as keyof typeof plan].map((id, idx) => {
                const dish = dishesById[id];
                if (!dish) return null;
                return (
                  <div
                    key={`${id}-${idx}`}
                    className="flex items-center justify-between rounded-md border border-border bg-background px-2 py-2"
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData(
                        "application/json",
                        JSON.stringify({ dishId: id, fromDay: d, index: idx })
                      )
                    }
                    aria-label={`Move ${dish.name}`}
                  >
                    <span className="text-sm">{dish.name}</span>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => removeDishFromDay(d as any, idx)}
                      aria-label={`Remove ${dish.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => openPicker(d)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add dish
            </Button>
          </article>
        ))}
      </section>

      <Drawer open={pickerOpen} onOpenChange={setPickerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add dish</DrawerTitle>
            <DrawerDescription>
              {activeDay ? `Pick a dish to add on ${activeDay}.` : "Pick a day and dish to add."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-3">
            <Input
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{dish.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {dish.ingredients.length} ingredients
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!activeDay) return;
                      addDishToDay(activeDay as any, dish.id);
                      toast({ title: "Added", description: `${dish.name} on ${activeDay}` });
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
              {filteredDishes.length === 0 && (
                <p className="text-sm text-muted-foreground">No dishes match your search.</p>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Index;
