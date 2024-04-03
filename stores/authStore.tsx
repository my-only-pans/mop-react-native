// counter.store.js
import React from "react";
import { observable, action, makeObservable } from "mobx";
import { MyProfileType } from "../types/UserTypes";

class AuthStore {
  @observable myProfile: MyProfileType | null = null;

  @observable authToken: string | null = null;

  @observable userEquipment: string[] | null = null;

  @observable userIngredients: string[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  login(authToken: string, myProfile: MyProfileType) {
    this.authToken = authToken;
    this.myProfile = myProfile;
    this.userEquipment = myProfile.equipment;
    this.userIngredients = myProfile.ingredients;
  }

  @action.bound
  logout() {
    this.authToken = null;
    this.myProfile = null;
  }

  @action.bound
  setUserEquipment(equipment: string[]) {
    this.userEquipment = equipment;
  }

  @action.bound
  setUserIngredients(ingredients: string[]) {
    this.userIngredients = ingredients;
  }
}

const authStore = new AuthStore();

// Create a React Context with the counter store instance.
export const AuthStoreContext = React.createContext(authStore);
export const useAuthStore = () => React.useContext(AuthStoreContext);
