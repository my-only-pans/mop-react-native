import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Container from "../../../commonComponents/Container";
import { Button, TextInput } from "react-native-paper";
import Row from "../../../commonComponents/Row";
import { Input } from "react-native-elements";
import NumberInput from "../../../commonComponents/form/NumberInput";
import colors from "../../../../theme/colors";
import StyledButton from "../../../commonComponents/StyledButton";
import { useRouter } from "expo-router";
import axios from "axios";
import getServerUrl from "../../../../utils/getServerUrl";
import generateApiHeader from "../../../../utils/generateApiHeader";

interface Props {
  recipeId?: string;
}

function NewRecipePage(props: Props) {
  const { recipeId } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [serving, setServing] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState("");

  const router = useRouter();

  const handleAddCategories = () => {
    const newCategories = categoryValue
      .split(/,|\n/)
      .map((c) => c.trim().toLowerCase());

    setCategories([...new Set([...categories, ...newCategories])]);
    setCategoryValue("");
  };

  const handleClickNext = async () => {
    const body = {
      title,
      description,
      prepTime,
      cookTime,
      serving,
      categories,
    };

    const headers = await generateApiHeader();

    const res = await axios.post(getServerUrl() + "/recipe/draft", body, {
      headers,
    });

    console.log(res);
  };

  return (
    <Container style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ flexGrow: 1, marginBottom: 48 }}>
        <Text style={styles.header}>Create a New Recipe</Text>
        <Text style={styles.subHeader}>
          Enter the following information to upload your own recipe.
        </Text>
        <View style={{ rowGap: 20 }}>
          <TextInput
            label="Title"
            placeholder="Recipe Title"
            value={title}
            onChangeText={setTitle}
            numberOfLines={2}
          />

          <TextInput
            label="Description"
            placeholder="Recipe Description"
            value={description}
            onChangeText={setDescription}
            numberOfLines={4}
            multiline
          />

          <Row
            onlyWeb
            style={{ columnGap: 20, rowGap: Platform.OS !== "web" ? 20 : 0 }}
          >
            <TextInput
              style={styles.columnInput}
              keyboardType="numeric"
              label="Prep Time"
              value={prepTime}
              onChangeText={setPrepTime}
              placeholder={"Enter prep time"}
            />

            <TextInput
              style={styles.columnInput}
              keyboardType="numeric"
              label="Cook Time"
              value={cookTime}
              onChangeText={setCookTime}
              placeholder={"Enter cook time"}
            />

            <TextInput
              style={styles.columnInput}
              keyboardType="numeric"
              label="Serving"
              value={serving}
              onChangeText={setServing}
              placeholder={"Enter number of servings"}
            />
          </Row>
          <Row
            onlyWeb
            style={{ columnGap: 20, rowGap: Platform.OS !== "web" ? 20 : 0 }}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{ flex: 1 }}
                label="Add Categories"
                placeholder="Enter categories. You can add multiple categories by separating them with comma or new line"
                value={categoryValue}
                onChangeText={setCategoryValue}
                numberOfLines={3}
                multiline
              />
              <Button icon="plus" onPress={handleAddCategories}>
                Add
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Tags:</Text>
              <View style={styles.categories}>
                {categories.map((category) => (
                  <View key={category}>
                    <Text>{category}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Row>
        </View>
      </View>

      <Row
        style={{
          justifyContent: "flex-end",
          columnGap: 20,
        }}
      >
        <StyledButton buttonColor="#bbb" onPress={() => router.push("/")}>
          Cancel
        </StyledButton>
        <StyledButton buttonColor={colors.highlight} onPress={handleClickNext}>
          Next
        </StyledButton>
      </Row>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 48,
    marginTop: 10,
    textAlign: "left",
  },
  columnInput: {
    flex: 1,
  },
  categories: {
    flexDirection: "row",
    gap: 10,
  },
});

export default NewRecipePage;
