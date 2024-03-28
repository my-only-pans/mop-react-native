import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextBlockType } from "../../../types/RecipeTypes";
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";

interface Props {
  onDelete: () => any;
  onClose: () => any;
  onChangeType: (type: TextBlockType) => any;
  type: TextBlockType;
}

const blockTypeKeys = Object.keys(TextBlockType);

function EditorBlockOptions(props: Props) {
  const { onDelete, onClose, type, onChangeType } = props;

  const types = blockTypeKeys.map((t) => {
    let label: string = "Paragraph";

    switch (t) {
      case "h1":
        label = "Heading 1";
        break;

      case "h2":
        label = "Heading 2";
        break;

      case "h3":
        label = "Heading 3";
        break;

      case "h4":
        label = "Heading 4";
        break;

      case "h5":
        label = "Heading 5";
        break;

      default:
        break;
    }

    return { type: t, label: label };
  });

  return (
    <View style={{ gap: 10 }}>
      {types.map((t) => (
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                t.type === type ? colors.highlight : "transparent",
            },
          ]}
          key={t.type}
          onPress={() => {
            onChangeType(t.type as TextBlockType);
            onClose();
          }}
        >
          <Text
            style={[
              {
                fontWeight: t.type === type ? "bold" : "normal",
              },
              textStyles[t.type as TextBlockType],
            ]}
          >
            {/* {t.type !== type && "Apply "} */}
            {t.label}
          </Text>
        </Pressable>
      ))}
      <Pressable
        style={styles.button}
        onPress={() => {
          onDelete();
          onClose();
        }}
      >
        <Text style={{ color: colors.danger }}>Delete Block</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
});

export default EditorBlockOptions;
