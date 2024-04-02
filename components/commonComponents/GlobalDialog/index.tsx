import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { Dialog } from "react-native-paper";
import { useUiSore } from "../../../stores/uiStore";
import { observer } from "mobx-react-lite";
import { dialogComponents } from "./dialogComponents";
import { toJS } from "mobx";

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
    dialogStyle,
    closeDialog,
  } = useUiSore();

  let content: ReactNode;
  if (dialogContent) {
    console.log("dialogContext", toJS(dialogContext));
    content = React.createElement(
      dialogComponents[dialogContent],
      dialogContext
    );
  } else {
    content = null;
  }

  const handleDismiss = () => {
    closeDialog();
    dialogProps?.onDismiss && dialogProps?.onDismiss();
  };

  return (
    <Dialog
      {...dialogProps}
      style={[
        {
          borderRadius: 5,
          padding: 32,
          maxWidth: 600,
          marginHorizontal: "auto",
          width: "100%",
        },
        dialogStyle,
      ]}
      visible={isDialogVisible}
      dismissable={dialogProps?.dismissable || true}
      onDismiss={handleDismiss}
    >
      {content}
    </Dialog>
  );
}

export default observer(GlobalDialog);
