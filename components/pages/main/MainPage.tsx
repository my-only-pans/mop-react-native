import React, { useState } from "react";
import Container from "../../commonComponents/Container";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../theme/colors";
import { Searchbar } from "react-native-paper";
import { textStyles } from "../../../theme/text";
import { RecipeItemType } from "../../../types/RecipeTypes";
import RecipeItem from "../../commonComponents/RecipeItem";
import { RECIPE_CATEGORIES } from "../../../constants";
import RecipeCategoriItem from "../../commonComponents/RecipeCategoriItem";

// TODO Replace with actula data
const SAMPLE_FEATURED_RECIPES: RecipeItemType[] = [
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

interface Props {}

function MainPage(props: Props) {
  const [searchString, setSearchString] = useState("");
  const {} = props;

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

      <View style={styles.section}>
        <Text style={[textStyles.h1, styles.heading]}>FEATURED RECIPES</Text>
        <FlatList
          data={SAMPLE_FEATURED_RECIPES}
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RecipeItem recipe={item} />}
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

export default MainPage;
