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
import { RecipeItemType, RecipeType } from "../../types/RecipeTypes";
import moment from "moment";
import { fontSizes } from "../../theme/text";

interface Props {
  recipe: RecipeType;
}

function RecipeCard(props: Props) {
  const { recipe } = props;
  const { _id, imageUrl, title, owner, createdAt, averageRating, totalRates } =
    recipe;

  return (
    <Link href={`/recipes/${_id}`} style={{ flex: 0 }}>
      <View style={styles.container}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("../../assets/placholder-food-img.png")
          }
          style={styles.image}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.owner}>By: {owner?.username}</Text>
        <View style={styles.footer}>
          <Text style={styles.rating}>
            {averageRating ? "*".repeat(averageRating) : null}
            {totalRates ? `(${totalRates})` : null}
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
  title: {
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
