import React, { useEffect, useState } from "react";
import Container from "../../commonComponents/Container";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../theme/colors";
import { textStyles } from "../../../theme/text";
import { RecipeItemType } from "../../../types/RecipeTypes";
import RecipeCard from "../../commonComponents/RecipeCard";

// TODO Replace with actula data
const SAMPLE_FEATURED_RECIPES: RecipeItemType[] = [
  {
    _id: "1",
    name: "Fried Chicken",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "2",
    name: "Beef Stew",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "3",
    name: "Fish and Chips",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "4",
    name: "Poutine",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "5",
    name: "Ramen",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "6",
    name: "Salad",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
  {
    _id: "7",
    name: "Steak",
    owner: {
      _id: "owner1",
      username: "jdoe",
    },
    rating: {
      avg: 4.8,
      ratingNum: 248,
    },
    createdAt: "2024-03-14T01:30:00.000-05:00",
  },
];

for (let i = 0; i < SAMPLE_FEATURED_RECIPES.length; i++) {
  SAMPLE_FEATURED_RECIPES[i].imageUrl = `https://picsum.photos/seed/${
    i + 1
  }/200/200`;
}

interface Props {}

function RecipesPage(props: Props) {
  const {} = props;
  const { category } = useLocalSearchParams();

  const [searchString, setSearchString] = useState("");

  const fetchRecipes = () => {
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
        <Text style={[textStyles.h1, styles.heading]}>200 SEARCH RESULTS</Text>
        <View style={styles.list}>
          {SAMPLE_FEATURED_RECIPES.map((recipe) => (
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
