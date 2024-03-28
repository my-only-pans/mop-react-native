import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  RecipeInstructions,
  TextBlockType,
} from "../../../../types/RecipeTypes";
import Editor from "../../../commonComponents/editor/Editor";

interface Props {
  instructions: RecipeInstructions;
}

const sample: RecipeInstructions = [
  {
    type: TextBlockType.h1,
    text: "Hello World",
  },
  {
    type: TextBlockType.p,
    text: "This is a paragraph. Yes it is",
  },
];

function RecipeInstructionsForm(props: Props) {
  const { instructions } = props;
  const [value, setValue] = useState<RecipeInstructions>(
    instructions ?? [{ type: TextBlockType.p, text: "" }]
  );

  return (
    <View style={styles.container}>
      <Editor value={value} onChange={setValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
});

export default RecipeInstructionsForm;
