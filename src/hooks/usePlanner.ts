import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Day, Dish, Ingredient } from "@/types";
import { seedDishes } from "@/data/seed";

const daysInternal: Day[] = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const defaultPlan: Record<Day, string[]> = daysInternal.reduce((acc, d) => {
  acc[d] = [];
  return acc;
}, {} as Record<Day, string[]>);

export function usePlanner() {
  const [dishes, setDishes] = useLocalStorage<Dish[]>("dp_dishes", seedDishes);
  const [plan, setPlan] = useLocalStorage<Record<Day, string[]>>("dp_plan", defaultPlan);
  const [haveMap, setHaveMap] = useLocalStorage<Record<string, boolean>>("dp_have", {});

  const days = daysInternal;

  const dishesById = useMemo(() => {
    const map: Record<string, Dish> = {};
    for (const d of dishes) map[d.id] = d;
    return map;
  }, [dishes]);

  const addDishToDay = (day: Day, dishId: string) => {
    setPlan({ ...plan, [day]: [...plan[day], dishId] });
  };

  const removeDishFromDay = (day: Day, index: number) => {
    const arr = [...plan[day]];
    arr.splice(index, 1);
    setPlan({ ...plan, [day]: arr });
  };

  const moveDish = (fromDay: Day, toDay: Day, dishId: string, fromIndex: number) => {
    const next = { ...plan, [fromDay]: [...plan[fromDay]], [toDay]: [...plan[toDay]] };
    if (next[fromDay][fromIndex] === dishId) {
      next[fromDay].splice(fromIndex, 1);
    } else {
      const idx = next[fromDay].indexOf(dishId);
      if (idx >= 0) next[fromDay].splice(idx, 1);
    }
    next[toDay].push(dishId);
    setPlan(next);
  };

  const clearPlan = () => setPlan(defaultPlan);

  const planDishes = useMemo(() => {
    const result: { day: Day; dishId: string; dish: Dish }[] = [];
    for (const day of days) {
      for (const id of plan[day]) {
        const dish = dishesById[id];
        if (dish) result.push({ day, dishId: id, dish });
      }
    }
    return result;
  }, [plan, dishesById]);

  const allIngredients = useMemo(() => {
    const items: { dishId: string; dishName: string; ingredient: Ingredient }[] = [];
    for (const day of days) {
      for (const id of plan[day]) {
        const dish = dishesById[id];
        if (!dish) continue;
        for (const ing of dish.ingredients) {
          items.push({ dishId: id, dishName: dish.name, ingredient: ing });
        }
      }
    }
    return items;
  }, [plan, dishesById]);

  const missingAggregated = useMemo(() => {
    const map = new Map<string, { name: string; unit: string; quantity: number }>();
    for (const { ingredient } of allIngredients) {
      if (haveMap[ingredient.id]) continue;
      const unit = ingredient.unit ?? "";
      const qty = ingredient.quantity ?? 1;
      const key = `${ingredient.name}|${unit}`;
      if (!map.has(key)) map.set(key, { name: ingredient.name, unit, quantity: 0 });
      map.get(key)!.quantity += qty;
    }
    return Array.from(map.values());
  }, [allIngredients, haveMap]);

  return {
    days,
    dishes,
    setDishes,
    plan,
    setPlan,
    dishesById,
    addDishToDay,
    removeDishFromDay,
    moveDish,
    clearPlan,
    haveMap,
    setHaveMap,
    planDishes,
    allIngredients,
    missingAggregated,
  };
}
