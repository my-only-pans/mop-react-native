import { Link, router } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform
} from "react-native";
import { Button } from "react-native-paper";
import { textStyles } from "../../../../theme/text";
import { GetRecipesQueryType, RecipeType } from "../../../../types/RecipeTypes";
import RecipeSearchBar from "../../../../components/commonComponents/RecipeSearchBar";
import Container from "../../../../components/commonComponents/Container";
import getServerUrl from "../../../../utils/getServerUrl";
import { useLocalSearchParams } from "expo-router";
import getAuthToken from "../../../../utils/getAuthToken";
import RecipeCard from "../../../../components/commonComponents/RecipeCard";
import getErrorMessage from "../../../../utils/getErrorMessage";
import convertParamsArray from "../../../../utils/convertParamsArray";
import Row from "../../../../components/commonComponents/Row";
import colors from "../../../../theme/colors";

const PAGE_LIMIT = 20;

function SavedRecipesPage() {
  const { recipeId } = useLocalSearchParams();

  const params = useLocalSearchParams();
  const { categories, page } = params;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const buttonContainerStyle = [styles.buttonContainer,
  Platform.OS === 'web' ? styles.buttonContainerWeb : styles.buttonContainerMobile];


  const fetchRecipes = async () => {
    setLoading(true);

    axios
      .get(getServerUrl() + "/recipe/saved", {
        headers: {
          Authorization: await getAuthToken(),
        },
      })
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
        <View style={buttonContainerStyle}>
          <Button mode="contained">
            <Link href={`/recipes/my-recipes`}>My Recipes</Link>
          </Button>

          <Button mode="contained">
            <Link href={`/recipes/my-recipes/my-drafts`}>My Drafts</Link>
          </Button>

          <Button mode="contained">
            <Link href={`/recipes/my-recipes/saved`}>My Saved Recipes</Link>
          </Button>
        </View>
      </View>

      <Text style={[textStyles.h1, styles.heading]}>My Saved Recipes</Text>
      <View style={{ flexGrow: 1, justifyContent: "center" }}>{content}</View>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "flex-end",
    paddingVertical: 4,
  },
  buttonContainerWeb: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    marginBottom: 48,
  },
  buttonContainerMobile: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: 'wrap',
    gap:4,
  },
  header: {
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

export default SavedRecipesPage;
