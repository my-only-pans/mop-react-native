import { Link } from "expo-router";
import React, { memo } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fontSizes } from "../../theme/text";
import { RecipeItemType } from "../../types/RecipeTypes";

interface Props {
  recipe: RecipeItemType;
}

function RecipeCard(props: Props) {
  const { recipe } = props;
  const { _id, imageUrl, name } = recipe;

  return (
    <Link href={`/recipes/${_id}`} style={{ flex: 0 }}>
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
  container: {},
  image: {
    width: Platform.OS === "web" ? 200 : Dimensions.get("screen").width - 64,
    height: 200,
    marginBottom: 12,
    borderRadius: 16,
  },
  name: {
    // fontSize: fontSizes.md,
  },
});

export default memo(RecipeCard);
