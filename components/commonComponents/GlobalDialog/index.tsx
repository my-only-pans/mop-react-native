import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { Dialog } from "react-native-paper";
import { useUiSore } from "../../../stores/uiStore";
import { observer } from "mobx-react-lite";
import { dialogComponents } from "./dialogComponents";

export interface GlobalDialogProps {
  dismissable?: boolean;
  onDismiss?: () => any;
  style?: ViewStyle;
}

function GlobalDialog() {
  const {
    isDialogVisible,
    dialogContent,
    dialogProps,
    dialogContext,
    closeDialog,
  } = useUiSore();

  console.log(isDialogVisible, dialogContent, dialogProps, dialogContext);

  let content: ReactNode;
  if (dialogContent) {
    content = React.createElement(dialogComponents[dialogContent], dialogProps);
  } else {
    content = null;
  }

  console.log(content);

  const handleDismiss = () => {
    closeDialog();
    dialogProps?.onDismiss && dialogProps?.onDismiss();
  };

  return (
    <Dialog
      {...dialogProps}
      visible={isDialogVisible}
      dismissable={dialogProps?.dismissable || true}
      onDismiss={handleDismiss}
    >
      {content}
    </Dialog>
  );
}

export default observer(GlobalDialog);
