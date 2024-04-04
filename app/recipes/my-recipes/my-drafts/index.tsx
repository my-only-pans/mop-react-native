import { Link } from "expo-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
import { textStyles } from "../../../../theme/text";
import { RecipeType } from "../../../../types/RecipeTypes";
import Container from "../../../../components/commonComponents/Container";
import getServerUrl from "../../../../utils/getServerUrl";
import getAuthToken from "../../../../utils/getAuthToken";
import RecipeCard from "../../../../components/commonComponents/RecipeCard";
import getErrorMessage from "../../../../utils/getErrorMessage";
import colors from "../../../../theme/colors";

function ViewMyDrafts() {
  const [loading, setLoading] = useState(true);

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const buttonContainerStyle = [styles.buttonContainer,
    Platform.OS === 'web' ? styles.buttonContainerWeb : styles.buttonContainerMobile];

  const fetchRecipes = async () => {
    setLoading(true);

    axios
      .get(getServerUrl() + "/recipe/draft", {
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
          <RecipeCard key={recipe._id} recipe={recipe} isDraft />
        ))}
      </View>
    );
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

      <Text style={[textStyles.h1, styles.heading]}>My Drafts</Text>
      <View>{content}</View>
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
  buttonWeb: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  buttonTextWeb: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonMobile: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  buttonTextMobile: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ViewMyDrafts;
