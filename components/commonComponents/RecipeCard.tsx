import { Link } from "expo-router";
import React, { memo, useMemo } from "react";
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
import { testStyles } from "../../theme/viewStyles";

interface Props {
  recipe: RecipeType;
  isDraft?: boolean;
}

function RecipeCard(props: Props) {
  const { recipe, isDraft = false } = props;
  const { _id, imageUrl, title, owner, createdAt, averageRating, totalRates } =
    recipe;

  const redirectUrl = useMemo(() => {
    return isDraft ? `/recipes/draft/${_id}` : `/recipes/${_id}`;
  }, [isDraft]);

  return (
    <Link href={redirectUrl} style={{ flex: 0 }}>
      <View style={[styles.container]}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("../../assets/placholder-food-img.png")
          }
          style={styles.image}
        />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
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
  container: {
    width: Platform.OS === "web" ? 200 : Dimensions.get("screen").width - 64,
  },
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
