import type { Dish } from "@/types";

export const seedDishes: Dish[] = [
  {
    id: "dish_spagbol",
    name: "Spaghetti Bolognese",
    ingredients: [
      { id: "ing_spaghetti", name: "Spaghetti", quantity: 500, unit: "g" },
      { id: "ing_ground_beef", name: "Ground beef", quantity: 500, unit: "g" },
      { id: "ing_tomato_sauce", name: "Tomato sauce", quantity: 1, unit: "jar" },
      { id: "ing_onion", name: "Onion", quantity: 1, unit: "" },
      { id: "ing_garlic", name: "Garlic cloves", quantity: 2, unit: "" },
    ],
  },
  {
    id: "dish_chicken_salad",
    name: "Chicken Salad",
    ingredients: [
      { id: "ing_chicken_breast", name: "Chicken breast", quantity: 2, unit: "pcs" },
      { id: "ing_lettuce", name: "Lettuce", quantity: 1, unit: "head" },
      { id: "ing_tomato", name: "Tomatoes", quantity: 2, unit: "" },
      { id: "ing_cucumber", name: "Cucumber", quantity: 1, unit: "" },
      { id: "ing_dressing", name: "Salad dressing", quantity: 1, unit: "bottle" },
    ],
  },
  {
    id: "dish_tacos",
    name: "Tacos",
    ingredients: [
      { id: "ing_tortillas", name: "Tortillas", quantity: 8, unit: "" },
      { id: "ing_ground_beef_taco", name: "Ground beef", quantity: 400, unit: "g" },
      { id: "ing_taco_seasoning", name: "Taco seasoning", quantity: 1, unit: "packet" },
      { id: "ing_cheese", name: "Cheddar cheese", quantity: 150, unit: "g" },
      { id: "ing_lettuce_taco", name: "Lettuce", quantity: 1, unit: "head" },
    ],
  },
  {
    id: "dish_pancakes",
    name: "Pancakes",
    ingredients: [
      { id: "ing_flour", name: "Flour", quantity: 2, unit: "cup" },
      { id: "ing_milk", name: "Milk", quantity: 1.5, unit: "cup" },
      { id: "ing_egg", name: "Eggs", quantity: 2, unit: "" },
      { id: "ing_baking_powder", name: "Baking powder", quantity: 2, unit: "tsp" },
      { id: "ing_maple_syrup", name: "Maple syrup", quantity: 1, unit: "bottle" },
    ],
  },
];
