import { Link } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  category: {
    key: string;
    image: ImageSourcePropType;
    label: string;
  };
}

function RecipeCategoriItem({ category }: Props) {
  const { key, image, label } = category;

  return (
    <Link href={`/recipes/${key}`}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 12,
    borderRadius: 75,
  },
  label: {
    textAlign: "center",
  },
});

export default RecipeCategoriItem;
