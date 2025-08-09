export type Day = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export interface Ingredient {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  category?: string;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
}
