import React, { useEffect, useState } from "react";
import RecipeView from "../../components/commonComponents/recipe/RecipeView";
import { RecipeType } from "../../types/RecipeTypes";
import axios from "axios";
import getServerUrl from "../../utils/getServerUrl";
import { useLocalSearchParams } from "expo-router";
import getAuthToken from "../../utils/getAuthToken";
import getErrorMessage from "../../utils/getErrorMessage";
import Container from "../../components/commonComponents/Container";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

function RecipeViewpage(props: Props) {
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

  useEffect(() => {
    fetchRecipe();
  }, []);

  console.log({ loading, recipe });

  if (loading) {
    return (
      <Container>
        <View style={styles.placeholderContainer}>
          <Text>Loading Recipe...</Text>
        </View>
      </Container>
    );
  }

  if (!loading && !recipe) {
    return (
      <Container>
        <View style={styles.placeholderContainer}>
          <Text>Recipe Not Found</Text>
        </View>
      </Container>
    );
  }

  if (recipe) {
    return (
      <Container>
        <RecipeView recipe={recipe} onReFetch={fetchRecipe} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default RecipeViewpage;
