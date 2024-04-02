import React, { useEffect, useState } from "react";
import Container from "../../commonComponents/Container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";
import { GetRecipesQueryType, RecipeType } from "../../../types/RecipeTypes";
import RecipeCard from "../../commonComponents/RecipeCard";
import axios from "axios";
import getServerUrl from "../../../utils/getServerUrl";
import getAuthToken from "../../../utils/getAuthToken";
import getErrorMessage from "../../../utils/getErrorMessage";
import Row from "../../commonComponents/Row";
import RecipeSearchBar from "../../commonComponents/RecipeSearchBar";
import convertParamsArray from "../../../utils/convertParamsArray";

const PAGE_LIMIT = 20;

function RecipesPage() {
  const params = useLocalSearchParams();
  const { categories, page } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [total, setTotal] = useState(0);
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
        setTotal(res.data.total);
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

  const handleApplyFilter = (filters?: GetRecipesQueryType) => {
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

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].imageUrl = `https://picsum.photos/seed/${i + 1}/200/200`;
  }

  return (
    <Container>
      <View style={styles.header}>
        <RecipeSearchBar
          onApplyFilter={handleApplyFilter}
          initialValues={params}
        />
      </View>
      <View style={{ flexGrow: 1, justifyContent: "center" }}>
        <Text style={[textStyles.h1, styles.heading]}>
          {total} Recipes Found
        </Text>
        {content}
      </View>
      <Row
        style={[
          styles.loadMoreContainer,
          {
            justifyContent: !page || page == "1" ? "flex-end" : "space-between",
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
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 48,
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
  loadMoreContainer: {
    marginTop: 48,
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadMoreText: {
    color: colors.info,
  },
});

export default RecipesPage;
