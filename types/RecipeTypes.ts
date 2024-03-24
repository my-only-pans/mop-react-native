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
