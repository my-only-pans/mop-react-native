import { Link, router } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { textStyles } from "../../../theme/text";
import RecipeItem from "../../../components/commonComponents/RecipeItem";
import { RECIPE_CATEGORIES } from "../../../constants";
import { RecipeType } from "../../../types/RecipeTypes";
import RecipeCategoriItem from "../../../components/commonComponents/RecipeCategoriItem";
import RecipeSearchBar from "../../../components/commonComponents/RecipeSearchBar";
import { SimpleRecipeItemType } from "../../../types/RecipeTypes";
import Container from "../../../components/commonComponents/Container";
import getServerUrl from "../../../utils/getServerUrl";
import { useLocalSearchParams } from "expo-router";
import getAuthToken from "../../../utils/getAuthToken";



const SAMPLE_FEATURED_RECIPES: SimpleRecipeItemType[] = [
    {
      _id: "1",
      name: "Fried Chicken",
    },
    {
      _id: "2",
      name: "Beef Stew",
    },
    {
      _id: "3",
      name: "Fish and Chips",
    },
    {
      _id: "4",
      name: "Poutine",
    },
    {
      _id: "5",
      name: "Ramen",
    },
    {
      _id: "6",
      name: "Salad",
    },
    {
      _id: "7",
      name: "Steak",
    },
  ];
  
  for (let i = 0; i < SAMPLE_FEATURED_RECIPES.length; i++) {
    SAMPLE_FEATURED_RECIPES[i].imageUrl = `https://picsum.photos/seed/${
      i + 1
    }/200/200`;
  }


function ViewMyRecipes(){
    const [recipe, setRecipe] = useState<RecipeType | null>();
    const [loading, setLoading] = useState(true);
    const { recipeId } = useLocalSearchParams();

    const fetchRecipe = async () => {
        setLoading(true);
        axios
        .get(getServerUrl() + `/recipe/${recipeId}`, {
            params: {
            _id: recipeId,
            },
            headers: {
            Authorization: await getAuthToken(),
            },
        })
        .then((res) => {
            setRecipe(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    };
    

    const handleDraftsPress = () => {
        
    };
    
    const handleMyRecipesPress = () => {
        // Fetch recipes when "My Recipes" button is clicked
        fetchRecipe();
    };
    
    const handleSavedPress = () => {
        
    };

    


    return (
        <Container>
            <View style={styles.header}>
                <RecipeSearchBar
                onApplyFilter={(filters) => {
                    router.push(`/recipes?searchString=${filters?.searchString}`);
                }}
                showFilterBtn={false}
                initialValues={{}}
                />
            </View>

            <View style={styles.header}>
                {/* Buttons for mydraft, myrecipe, mysavedrecipe */}
                <Button mode="contained" onPress={handleDraftsPress}>
                My Drafts
                </Button>
                <Button mode="contained" onPress={handleMyRecipesPress}>
                My Recipes
                </Button>
                <Button mode="contained" onPress={handleSavedPress}>
                My Saved Recipes
                </Button>
            </View>

            <View style={styles.section}>
                <Text style={[textStyles.h1, styles.heading]}>My Recipes</Text>
                <FlatList
                data={SAMPLE_FEATURED_RECIPES}
                horizontal
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <RecipeItem recipe={item} />}
                contentContainerStyle={styles.list}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 20,
      marginBottom: 48,
    },
    section: {
      marginBottom: 64,
    },
    list: {
      paddingBottom: 12,
    },
    searchbar: {
      flex: 1,
      maxWidth: 400,
      flexGrow: 1,
    },
    heading: {
      marginBottom: 24,
    },
    separator: {
      width: 24,
    },
  });
  
export default ViewMyRecipes;
