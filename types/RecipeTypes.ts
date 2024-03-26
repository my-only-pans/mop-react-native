export interface RecipeItemType {
  _id: string;
  name: string;
  imageUrl?: string;
  owner: {
    _id: string;
    username: string;
  };
  rating: {
    avg: number;
    ratingNum: number;
  };
  createdAt: string;
}

export type SimpleRecipeItemType = Pick<
  RecipeItemType,
  "_id" | "name" | "imageUrl"
>;

export interface RecipeIngredientType {
  _id: string;
  amount: number;
  unit: string;
}

export interface RecipeType {
  _id: string;
  title: string;
  description: string;
  owner: {
    _id: string;
    username: string;
  };
  rating?: {
    avg: number;
    ratingNum: number;
  };
  createdAt?: string;
  prepTime: number;
  cookTime: number;
  serving: number;
  ingredients: RecipeIngredientType[];
  equipment: string[];
  categories?: string[];
  instructions: string;
  imageUrl?: string;
}
