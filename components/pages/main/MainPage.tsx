import React, { useEffect, useState } from "react";
import Container from "../../commonComponents/Container";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { textStyles } from "../../../theme/text";
import { RecipeType, SimpleRecipeItemType } from "../../../types/RecipeTypes";
import RecipeItem from "../../commonComponents/RecipeItem";
import { RECIPE_CATEGORIES } from "../../../constants";
import RecipeCategoriItem from "../../commonComponents/RecipeCategoriItem";
import RecipeSearchBar from "../../commonComponents/RecipeSearchBar";
import { useRouter } from "expo-router";
import axios from "axios";
import getServerUrl from "../../../utils/getServerUrl";
import getErrorMessage from "../../../utils/getErrorMessage";
import RecipeCard from "../../commonComponents/RecipeCard";

function MainPage() {
  const router = useRouter();
  const [featuredRecipes, setFeaturedRecipes] = useState<RecipeType[]>([]);
  const [latestRecipes, setLatestRecipes] = useState<RecipeType[]>([]);

  const fetchFeaturedRecipes = async () => {
    axios
      .get(getServerUrl() + "/recipe", {
        params: {
          sortBy: "averageRating",
          sortOrder: "desc",
          limit: 5,
        },
      })
      .then((res) => {
        setFeaturedRecipes(res.data.recipes);
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
  };

  const fetchLatestRecipes = async () => {
    axios
      .get(getServerUrl() + "/recipe", {
        params: {
          sortBy: "createdAt",
          sortOrder: "desc",
          limit: 5,
        },
      })
      .then((res) => {
        setLatestRecipes(res.data.recipes);
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
  };

  useEffect(() => {
    fetchFeaturedRecipes();
    fetchLatestRecipes();
  }, []);

  return (
    <Container>
      <View style={styles.header}>
        <RecipeSearchBar
          onApplyFilter={(filters) => {
            if (filters?.searchString) {
              router.push(`/recipes?searchString=${filters?.searchString}`);
            } else {
              router.push("/recipes?page=1");
            }
          }}
          showFilterBtn={false}
          initialValues={{ searchString: "" }}
        />
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.h1, styles.heading]}>FEATURED RECIPES</Text>
        <FlatList
          data={featuredRecipes}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.h1, styles.heading]}>EXPLORE MORE</Text>
        <FlatList
          data={RECIPE_CATEGORIES}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 32 }} />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <RecipeCategoriItem category={item} />}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.section}>
        <Text style={[textStyles.h1, styles.heading]}>LATEST RECIPES</Text>
        <FlatList
          data={latestRecipes}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
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

export default MainPage;
