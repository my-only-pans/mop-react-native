import { Link, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { RecipeType } from "../../../types/RecipeTypes";
import textStyles from "../../../theme/text";
import colors from "../../../theme/colors";
import Editor from "../editor/Editor";
import RecipeButtons from "../../pages/recipes/RecipeButtons";
import RatingRecipe from "../rating/Rating";
import axios from "axios";
import getServerUrl from "../../../utils/getServerUrl";
import { useAuthStore } from "../../../stores/authStore";
import getErrorMessage from "../../../utils/getErrorMessage";
import { Snackbar } from "react-native-paper";
import { testStyles } from "../../../theme/viewStyles";

interface Props {
  recipe: RecipeType;
  isDraft?: boolean;
  onRefetch?: () => any;
  message?: string;
}

function RecipeView(props: Props) {
  const { recipe, isDraft = false, onRefetch } = props;
  const { recipeId } = useLocalSearchParams();
  const { myProfile, authToken } = useAuthStore();

  const {
    _id,
    title,
    description,
    serving,
    owner,
    prepTime,
    cookTime,
    categories,
    equipment,
    ingredients,
    draft,
    rating,
  } = recipe;

  const [servings, setServings] = useState(serving);

  // Function to decrease serving count
  const decreaseServing = () => {
    const newServing = servings - 1;
    if (newServing >= 1) {
      setServings(newServing);
    }
  };
  // Function to increase serving count
  const increaseServing = () => {
    const newServing = servings + 1;

    setServings(newServing);
  };

  const ingredientOutput = useMemo(() => {
    const servingRatio = servings / serving;

    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount * servingRatio,
    }));

    return updatedIngredients;
  }, [servings]);

  const handleRating = async (star: number) => {
    axios
      .post(
        getServerUrl() + "/recipe/rate",
        { recipeId, rating: star },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((res) => {
        onRefetch && onRefetch();
        // TODO display success
        // setServerMessage("Recipe successfuly rated");
      })
      .catch((error) => console.log(getErrorMessage(error)));
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.headerContainer, { flexWrap: "wrap" }]}>
        <Text style={[styles.header, textStyles.h1]}>
          {title} {isDraft && "(Draft)"}
        </Text>

        <View style={[styles.row]}>
          <RatingRecipe
            onRate={handleRating}
            averageRating={recipe.averageRating || 0}
          />
        </View>

        <View
          style={[
            styles.row,
            { justifyContent: "space-between", width: "100%" },
          ]}
        >
          <View
            style={[styles.row, { marginVertical: 6, alignItems: "center" }]}
          >
            <Text style={[styles.submittedBy, textStyles.h5]}>
              Submitted by:
            </Text>
            <Link
              href={`/recipes?owner=${owner._id}`}
              style={[styles.userName, textStyles.h6]}
            >
              {owner.username}
            </Link>
          </View>
          {!isDraft && (
            <View style={[{ alignItems: "flex-end" }]}>
              <RecipeButtons
                isOwner={owner._id === myProfile?._id}
                draftId={draft}
                recipeId={_id}
                userId={myProfile?._id}
              />
            </View>
          )}
        </View>

        <Text style={[styles.description, textStyles.body]}>{description}</Text>
      </View>

      <ScrollView style={[styles.imgContainer]} horizontal>
        {recipe.imageUrl ? (
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        ) : (
          <Image
            source={require("../../../assets/placholder-food-img.png")}
            style={styles.image}
          />
        )}
      </ScrollView>

      <View style={[styles.row]}>
        <Text style={[styles.label]}>Prep Time: </Text>
        <Text style={[textStyles.body]}>{prepTime} minutes</Text>
      </View>

      <View style={[styles.row]}>
        <Text style={[styles.label]}>Cook Time: </Text>
        <Text style={[textStyles.body]}>{cookTime} minutes</Text>
      </View>
      <View style={[styles.column]}>
        <View style={[styles.column, { justifyContent: "space-between" }]}>
          <View>
            <Text style={[styles.label]}>Categories:</Text>
            <View style={styles.tagContainer}>
              {Array.isArray(categories) &&
                categories.map((category, index) => (
                  <View key={index} style={styles.tagWrapper}>
                    <Text style={styles.tagText}>{category}</Text>
                  </View>
                ))}
            </View>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.label]}>Serving: </Text>
            <Text style={[textStyles.body]}>{servings}</Text>

            <TouchableOpacity onPress={decreaseServing}>
              <Icon
                name="minus-circle"
                type="material-community"
                color={colors.button}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={increaseServing}>
              <Icon
                name="plus-circle"
                type="material-community"
                color={colors.button}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.requirements}>
          <View>
            <Text style={[styles.label]}>Equipment:</Text>
            <View style={styles.tagContainer}>
              {Array.isArray(equipment) &&
                equipment.map((e, index) => (
                  <View key={index} style={styles.tagWrapper}>
                    <Text style={styles.tagText}>{e}</Text>
                  </View>
                ))}
            </View>
          </View>

          <View>
            <Text style={[styles.label]}>Ingredients:</Text>
            {ingredientOutput.map((ingredient, index) => {
              return (
                <View
                  key={ingredient._id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text style={[textStyles.body]}>
                    {ingredient.amount} {ingredient.unit} of {ingredient._id}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={[styles.label]}>Instructions: </Text>
          <Editor readonly value={recipe.instructions} />
        </View>
      </View>
    </View>
  );
}

export default RecipeView;

const styles = StyleSheet.create({
  container: {
    maxWidth: 900,
    width: "100%",
    marginHorizontal: "auto",
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 6,
  },
  header: {
    fontWeight: "bold",
    color: "#00473E",
    fontSize: 20,
    marginBottom: 6,
    textAlign: "left",
  },
  image: {
    aspectRatio: 4 / 3,
    flex: 1,
    width: Platform.OS !== "web" ? Dimensions.get("screen").width * 0.9 : 500,
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tagWrapper: {
    backgroundColor: "#C1E7E3",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    fontSize: 14,
    color: "#00473E",
  },
  row: {
    flexDirection: Platform.OS !== "web" ? "column" : "row",
    gap: 10,
  },
  column: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 20,
  },
  subHeader: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: "left",
  },
  recipeTitle: {},
  submittedBy: {},
  userName: {
    color: colors.button,
  },
  description: {
    fontStyle: "italic",
    marginTop: 4,
  },
  img: {
    width: 280,
    height: 280,
    borderRadius: 6,
    marginRight: 10,
  },
  imgContainer: {
    gap: 8,
    marginVertical: 14,
  },
  timeContainer: {
    marginBottom: 16,
    justifyContent: "space-between",
  },
  label: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#00473E",
    fontSize: 20,
    marginBottom: 24,
  },
  requirements: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    marginVertical: 24,
    paddingVertical: 24,
    gap: 20,
  },
  feedback: {
    position: "absolute",
    top: 0,
  },
});
