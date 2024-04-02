// counter.store.js
import React, { ReactNode } from "react";
import { observable, action, makeObservable } from "mobx";
import { GlobalDialogProps } from "../components/commonComponents/GlobalDialog";
import { ViewStyle } from "react-native";

class UiStore {
  @observable isDialogVisible: boolean = false;

  @observable dialogContent: string | null = null;

  @observable dialogProps: GlobalDialogProps | null | undefined = null;

  @observable dialogContext: { [key: string]: any } | null | undefined = null;

  @observable dialogStyle: ViewStyle | null | undefined = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  showDialog(options: {
    content: string;
    props?: GlobalDialogProps | null;
    context?: { [key: string]: any } | null;
    style?: ViewStyle;
  }) {
    this.isDialogVisible = true;
    this.dialogContent = options.content;
    this.dialogProps = options.props;
    this.dialogContext = options.context;
    this.dialogStyle = options.style;
  }

  @action.bound
  closeDialog() {
    this.isDialogVisible = false;
    this.dialogContent = null;
    this.dialogProps = null;
    this.dialogContext = null;
    this.dialogStyle = null;
  }
}

const uiStore = new UiStore();

// Create a React Context with the counter store instance.
export const UiStoreContext = React.createContext(uiStore);
export const useUiSore = () => React.useContext(UiStoreContext);
