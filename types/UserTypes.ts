export interface MyProfileType {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  equipment: string[];
  ingredients: string[];
  phone: string;
  imageUrl: string;
  savedRecipes?: string[];
}
