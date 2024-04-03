import { Link, router } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { textStyles } from "../../../theme/text";
import RecipeSearchBar from "../../../components/commonComponents/RecipeSearchBar";
import Container from "../../../components/commonComponents/Container";
import getServerUrl from "../../../utils/getServerUrl";
import { useLocalSearchParams } from "expo-router";
import getAuthToken from "../../../utils/getAuthToken";
import { GetRecipesQueryType, RecipeType } from "../../../types/RecipeTypes";
import getErrorMessage from "../../../utils/getErrorMessage";
import convertParamsArray from "../../../utils/convertParamsArray";
import RecipeCard from "../../../components/commonComponents/RecipeCard";
import Row from "../../../components/commonComponents/Row";
import colors from "../../../theme/colors";

const PAGE_LIMIT = 20;

function ViewMyRecipes() {
  const { recipeId } = useLocalSearchParams();

  const params = useLocalSearchParams();
  const { categories, page } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async (filter?: GetRecipesQueryType) => {
    setLoading(true);

    axios
      .get(getServerUrl() + "/recipe", {
        params: { limit: PAGE_LIMIT, ...filter },
        headers: {
          Authorization: await getAuthToken(),
        },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        if (res.data.recipes.length >= PAGE_LIMIT) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
        setLoading(false);
      });
  };

  useEffect(() => {
    const filters = {
      ...params,
      categories: categories ? convertParamsArray(categories) : undefined,
      // TODO insert filters
    };

    fetchRecipes(filters);
  }, [page]);

  const handleApplyFilter = (filters?: GetRecipesQueryType | null) => {
    let newParams: Record<string, string>;

    if (!filters) {
      filters = { page: 1 };
      router.push("/recipes?page=1");
    } else {
      newParams = { ...params, ...filters } as Record<string, string>;
      router.setParams(filters as Record<string, string>);
    }

    fetchRecipes(filters);
  };

  let content;

  if (loading) {
    content = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ justifyContent: "center" }}>Loading Recipes...</Text>
      </View>
    );
  } else if (!recipes?.length) {
    content = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ justifyContent: "center" }}>No recipes found</Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.list}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </View>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <RecipeSearchBar
          onApplyFilter={handleApplyFilter}
          initialValues={params}
          showFilterBtn
        />
      </View>

      <View style={styles.header}>
        <Button mode="contained">
          <Link href={`/recipes/my-recipes`}>My Recipes</Link>
        </Button>

        <Button mode="contained">
          <Link href={`/recipes/my-recipes/my-drafts`}>My Drafts</Link>
        </Button>

        <Button mode="contained">
          <Link href={`/recipes/my-recipes/my-saved-recipes`}>
            My Saved Recipes
          </Link>
        </Button>
      </View>

      <Text style={[textStyles.h1, styles.heading]}>My Recipes</Text>
      <View style={{ flexGrow: 1, justifyContent: "center" }}>{content}</View>
      <View style={styles.section}>
        <Row
          style={[
            styles.loadMoreContainer,
            {
              justifyContent:
                !page || page == "1" ? "flex-end" : "space-between",
            },
          ]}
        >
          {page && page !== "1" && (
            <Pressable
              onPress={() =>
                router.setParams({ page: (Number(page) - 1).toString() })
              }
            >
              <Text style={styles.loadMoreText}>Previous</Text>
            </Pressable>
          )}
          {hasMore && (
            <Pressable
              onPress={() =>
                router.setParams({
                  page: page ? (Number(page) + 1).toString() : "2",
                })
              }
            >
              <Text style={styles.loadMoreText}>Next</Text>
            </Pressable>
          )}
        </Row>
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
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 16,
    rowGap: 48,
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
  loadMoreContainer: {
    marginTop: 48,
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadMoreText: {
    color: colors.info,
  },
});

export default ViewMyRecipes;
