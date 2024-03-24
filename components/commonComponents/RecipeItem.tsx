import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RecipeItemType } from "../../types/RecipeTypes";
import { Link } from "expo-router";
import { fontSizes } from "../../theme/text";

interface Props {
  recipe: RecipeItemType;
}

function RecipeItem({ recipe }: Props) {
  const { _id, imageUrl, name } = recipe;

  return (
    <Link href={`/recipes/${_id}`}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 16,
  },
  name: {
    fontSize: fontSizes.md,
  },
});

export default RecipeItem;
