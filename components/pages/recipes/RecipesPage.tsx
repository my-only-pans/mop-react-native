import React, { useEffect, useState } from "react";
import Container from "../../commonComponents/Container";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";
import { RecipeItemType, RecipeType } from "../../../types/RecipeTypes";
import RecipeCard from "../../commonComponents/RecipeCard";
import axios from "axios";
import getServerUrl from "../../../utils/getServerUrl";
import getAuthToken from "../../../utils/getAuthToken";
import getErrorMessage from "../../../utils/getErrorMessage";

const PAGE_LIMIT = 20;

function RecipesPage() {
  const { category } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [total, setTotal] = useState(0);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async () => {
    setLoading(true);
    axios
      .get(getServerUrl() + "/recipe", {
        params: {
          limit: PAGE_LIMIT,
        },
        headers: {
          Authorization: await getAuthToken(),
        },
      })
      .then((res) => {
        setTotal(res.data.total);
        setRecipes(res.data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
        setLoading(false);
      });
    console.log("QUERY RECIPES", { category });
  };

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  const handleClickFilter = () => {
    console.log("FILTER OPEN");
  };

  const handleSearch = () => {
    console.log(searchString);
  };

  const handleClear = () => {
    setSearchString("");
  };

  if (loading) {
    return (
      <Container style={{ alignItems: "center" }}>
        <Text>Loading Recipes...</Text>
      </Container>
    );
  }

  if (!recipes?.length) {
    return (
      <Container style={{ alignItems: "center" }}>
        <Text>Loading Recipes...</Text>
      </Container>
    );
  }

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].imageUrl = `https://picsum.photos/seed/${i + 1}/200/200`;
  }

  return (
    <Container>
      <View style={styles.header}>
        <Searchbar
          value={searchString}
          onChangeText={setSearchString}
          style={styles.searchbar}
          onIconPress={handleSearch}
          onSubmitEditing={handleSearch}
          onTraileringIconPress={handleClear}
        />
        <Icon.Button
          name="sliders"
          size={24}
          backgroundColor="transparent"
          color="#000"
          underlayColor={colors.highlight}
          onPress={handleClickFilter}
          iconStyle={{ marginRight: 0 }}
        />
      </View>
      <View>
        <Text style={[textStyles.h1, styles.heading]}>
          {total} SEARCH RESULTS
        </Text>
        <View style={styles.list}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </View>
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
    // position: "relative",
  },
  searchbar: {
    flex: 1,
    maxWidth: 400,
    flexGrow: 1,
  },
  heading: {
    marginBottom: 24,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 48,
  },
});

export default RecipesPage;
