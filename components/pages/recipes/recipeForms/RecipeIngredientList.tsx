import React from "react";
import { RecipeIngredientType } from "../../../../types/RecipeTypes";
import Row from "../../../commonComponents/Row";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface Props {
  ingredients?: RecipeIngredientType[];
  onDelete: (_id: string) => void;
}

function RecipeIngredientList({ ingredients, onDelete }: Props) {
  if (!ingredients) return null;

  return (
    <View style={styles.container}>
      {ingredients.map((ingredient) => {
        const { _id, amount, unit } = ingredient;
        return (
          <View key={_id} style={styles.ingredient}>
            <Text style={styles.text}>
              {amount} {unit} {_id}
            </Text>
            <Pressable onPress={() => onDelete(_id)}>
              <Icon name="close" type="material-community" size={16} />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "flex-start",
  },
  ingredient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  text: {
    marginRight: 20,
  },
});

export default RecipeIngredientList;
