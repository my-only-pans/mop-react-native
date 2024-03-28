import React, { Dispatch, SetStateAction } from "react";
import {
  ListBlockType,
  RecipeInstructions,
  TextBlockType,
} from "../../../types/RecipeTypes";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import EditorBlock from "./EditorBlock";
import { Icon } from "react-native-elements";

interface Props {
  value: RecipeInstructions | null;
  readonly?: boolean;
  onChange?: Dispatch<SetStateAction<RecipeInstructions>>;
}

function Editor(props: Props) {
  const { value, readonly, onChange } = props;

  const handleAddBlock = () => {
    const newValue = [...(value || []), { type: TextBlockType.p, text: "" }];

    onChange && onChange(newValue);
  };

  const handleDeleteBlock = (i: number) => {
    const newValue = [...(value || [])];
    newValue.splice(i, 1);

    onChange && onChange(newValue);
  };

  const handleChangeBlockText = (i: number, text: string) => {
    const newValue = [...(value ?? [])];

    newValue[i].text = text;

    onChange && onChange(newValue);
  };

  const handleChangeBlockType = (i: number, type: TextBlockType) => {
    console.log(i, type);
    const newValue = [...(value || [])];

    // Update the type of the element at index i
    newValue[i].type = type;

    console.log(newValue);

    onChange && onChange(newValue);
  };

  return (
    <View style={styles.container}>
      {value?.map((node, i) => {
        return (
          <EditorBlock
            key={i}
            node={node}
            readonly={readonly}
            isFocused={i === value.length - 1}
            onDelete={() => handleDeleteBlock(i)}
            onChangeText={(text) => handleChangeBlockText(i, text)}
            onChangeBlockType={(type) => handleChangeBlockType(i, type)}
          />
        );
      })}
      {!readonly && (
        <Pressable style={styles.addBlockBtn} onPress={handleAddBlock}>
          <Icon name="add" />
          <Text>Add a block</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    width: "100%",
  },
  addBlockBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 24,
  },
});

export default Editor;
