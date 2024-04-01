import React, { useEffect, useState } from "react";
import Container from "../../commonComponents/Container";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
import Row from "../../commonComponents/Row";

const PAGE_LIMIT = 20;

function RecipesPage() {
  const { category, page } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [total, setTotal] = useState(0);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const fetchRecipes = async () => {
    setLoading(true);
    axios
      .get(getServerUrl() + "/recipe", {
        params: {
          limit: PAGE_LIMIT,
          page: page || 1,
          // TODO insert filters
        },
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
    fetchRecipes();
  }, [category, page]);

  const handleClickFilter = () => {
    console.log("FILTER OPEN");
  };

  const handleSearch = () => {
    console.log(searchString);
  };

  const handleClear = () => {
    setSearchString("");
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
