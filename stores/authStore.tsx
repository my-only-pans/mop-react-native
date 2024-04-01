// counter.store.js
import React from "react";
import { observable, action, makeObservable } from "mobx";
import { MyProfileType } from "../types/UserTypes";

class AuthStore {
  @observable myProfile: MyProfileType | null = null;

  @observable authToken: string | null = null;

  @observable firebaseToken: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  login(authToken: string, firebaseToken: string, myProfile: MyProfileType) {
    this.authToken = authToken;
    this.firebaseToken = firebaseToken;
    this.myProfile = myProfile;
  }

  @action.bound
  logout() {
    this.authToken = null;
    this.myProfile = null;
  }
}

const authStore = new AuthStore();

// Create a React Context with the counter store instance.
export const AuthStoreContext = React.createContext(authStore);
export const useAuthStore = () => React.useContext(AuthStoreContext);
