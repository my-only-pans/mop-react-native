import { Link } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { RecipeType } from "../../../types/RecipeTypes";
import textStyles from "../../../theme/text";
import colors from "../../../theme/colors";
import Editor from "../editor/Editor";
import RecipeButtons from "../../pages/recipes/RecipeButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RatingRecipe from "../rating/Rating";

interface Props {
  recipe: RecipeType;
  isDraft?: boolean;
  onReFetch: () => any ;
}

function RecipeView(props: Props) {
  const { recipe, isDraft = false, onReFetch } = props;
  const [myProfile, setMyProfile] = useState<any>();

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

  const fetchMyProfile = async () => {
    const profile = await AsyncStorage.getItem("myProfile");

    console.log(`profile ${profile}`);
    console.log(`owner.id : ${owner._id}`);
    //setMyProfile(JSON.parse(profile));
    if (profile !== null) {
      setMyProfile(JSON.parse(profile));
    } else {
      console.log(`profile ${profile}`);
    }
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

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

  console.log('rating:' ,rating);
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, {flexWrap: 'wrap'}]}>
        <Text style={[styles.header, textStyles.h1]}>
          {title} {isDraft && "(Draft)"}
        </Text>

        <View style={[styles.row]}>
          {/* //!!!!!!!!!!!!put rating here */}
          <RatingRecipe 
              recipeId={_id}
              rating={rating}
              onReFetch={onReFetch}
          />
        </View>

        <View style={[styles.row, {justifyContent: 'space-between', width:'100%'}]}>
          <View style={[styles.row, { marginVertical: 6, alignItems: "center" }]}>
            <Text style={[styles.submittedBy, textStyles.h5]}>Submitted by:</Text>
            <Link href={"./"} style={[styles.userName, textStyles.h6]}>
              {owner.username}
            </Link>
          </View>
          <View style={[{alignItems: 'flex-end'}]}>
            <RecipeButtons 
                isOwner={owner._id === myProfile?._id}
                draftId={draft} 
                recipeId={_id}
                userId={myProfile?._id}/>
          </View>
          
        </View>

        <Text style={[styles.description, textStyles.body]}>{description}</Text>
      </View>

      <ScrollView style={[styles.imgContainer]} horizontal>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.img}
            source={require("../../../assets/recipes/Ramen-Eggs-1.jpg")}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </Pressable>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.img}
            source={require("../../../assets/recipes/Ramen-Eggs-19.jpg")}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </Pressable>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.img}
            source={require("../../../assets/recipes/Ramen-Eggs-24.jpg")}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </Pressable>
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
              console.log(ingredient);

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
});
