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
  instructions: RecipeInstructions;
  imageUrl?: string;
  averageRating?: number;
  totalRates?: number;
  draft: string;
}

export enum TextBlockType {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  p = "p",
}

export enum ListBlockType {
  ol = "ol",
  ul = "ul",
}

export interface TextBlock {
  type: TextBlockType;
  text: string;
}

export interface ListBlock {
  type: ListBlockType;
  children: TextBlock[];
}

export type RecipeInstructions = Array<TextBlock>;

export type SortByFieldType =
  | "title"
  | "prepTime"
  | "cookTime"
  | "averageRating"
  | undefined
  | null;

export type SortOrderType = "ascending" | "descending" | "asc" | "desc";
export interface GetRecipesQueryType {
  limit?: number;
  page?: number;
  sortBy?: SortByFieldType;
  sortOrder?: SortOrderType;
  searchString?: string;
  owner?: string;
  categories?: string[] | undefined; // These are arrays and needed to be parsed
  ingredients?: string; // These are arrays and needed to be parsed
  equipment?: string; // These are arrays and needed to be parsed
  prepTime?: number;
  cookTime?: number;
  difficulty?: number;
}
