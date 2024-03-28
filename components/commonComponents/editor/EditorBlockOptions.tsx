import React from "react";
import { Pressable, Text, View } from "react-native";
import { TextBlockType } from "../../../types/RecipeTypes";

interface Props {
  onDelete: () => any;
  onClose: () => any;
  onChangeType: (type: TextBlockType) => any;
  type: TextBlockType;
}

const blockTypeKeys = Object.keys(TextBlockType);

function EditorBlockOptions(props: Props) {
  const { onDelete, onClose, type, onChangeType } = props;

  const types = blockTypeKeys
    .filter((k) => {
      return k !== type;
    })
    .map((t) => {
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
          key={t.type}
          onPress={() => {
            onChangeType(t.type as TextBlockType);
            onClose();
          }}
        >
          <Text style={{ color: "#000" }}>Apply {t.label}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => {
          onDelete();
          onClose();
        }}
      >
        <Text style={{ color: "#000" }}>Delete Block</Text>
      </Pressable>
    </View>
  );
}

export default EditorBlockOptions;
