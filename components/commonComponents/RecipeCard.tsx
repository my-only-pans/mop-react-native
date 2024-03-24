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
import { RecipeItemType } from "../../types/RecipeTypes";
import moment from "moment";
import { fontSizes } from "../../theme/text";

interface Props {
  recipe: RecipeItemType;
}

function RecipeCard(props: Props) {
  const { recipe } = props;
  const { _id, imageUrl, name, owner, createdAt, rating } = recipe;

  return (
    <Link href={`/recipes/${_id}`} style={{ flex: 0 }}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.owner}>By: {owner?.username}</Text>
        <View style={styles.footer}>
          <Text style={styles.rating}>
            {"*".repeat(rating.avg)} ({rating.ratingNum})
          </Text>
          <Text>{moment(createdAt).fromNow()}</Text>
        </View>
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
    fontSize: fontSizes.md,
    marginBottom: 8,
  },
  owner: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: fontSizes.sm,
  },
});

export default memo(RecipeCard);
