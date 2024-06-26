import React, { useState } from "react";
import { View, StyleSheet, Text, Platform, Pressable } from "react-native";
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";
import { Icon } from "react-native-elements";
import axios from "axios";
import { Link, router } from "expo-router";
import getServerUrl from "../../../utils/getServerUrl";
import getAuthToken from "../../../utils/getAuthToken";
import getErrorMessage from "../../../utils/getErrorMessage";
import { useAuthStore } from "../../../stores/authStore";
import { toJS } from "mobx";

interface Props {
  isOwner?: boolean;
  draftId?: string;
  recipeId?: string;
  userId?: string;
}

function RecipeButtons(props: Props) {
  const { draftId, isOwner = false, recipeId, userId } = props;
  const [loading, setLoading] = useState(false);
  const { myProfile, authToken } = useAuthStore();

  const [isSaved, setIsSaved] = useState<boolean>(
    !!myProfile?.savedRecipes?.includes(recipeId as string)
  );

  const iconSize = Platform.OS === "web" ? 30 : 20;

  const handleSaveRecipe = async () => {
    if (isSaved) return;

    setLoading(true);

    const body = { recipeId };

    axios
      .post(getServerUrl() + "/recipe/saved", body, {
        headers: { Authorization: await getAuthToken() },
      })
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setIsSaved(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(getErrorMessage(error).message);
        return setLoading(false);
      });
  };

  const handleUnsave = async () => {
    axios
      .delete(getServerUrl() + "/recipe/saved", {
        params: { recipeId: recipeId },
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        console.log("UNSAVE", res);
        if (res.data) {
          setLoading(false);
          setIsSaved(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(getErrorMessage(error).message);
        return setLoading(false);
      });
  };

  return (
    <View style={styles.buttonsCont}>
      {isOwner ? (
        <>
          <Link href={`/recipes/draft/${draftId}?section=details`}>
            <Icon
              name="edit"
              color={colors.highlight}
              type="material"
              size={iconSize}
            />
          </Link>
          <Link href={"./"}>
            <Icon
              name="delete"
              color={colors.highlight}
              type="material"
              size={iconSize}
            />
          </Link>
        </>
      ) : (
        <Pressable onPress={isSaved ? handleUnsave : handleSaveRecipe}>
          <Icon
            name={isSaved ? "bookmark" : "bookmark-outline"}
            color={colors.highlight}
            type="material"
            size={iconSize}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsCont: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30,
  },
});

export default RecipeButtons;

function setError(message: any) {
  throw new Error("Function not implemented.");
}
