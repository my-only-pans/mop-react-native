import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import Row from "../../../commonComponents/Row";
import { Icon, Image } from "react-native-elements";
import colors from "../../../../theme/colors";
import StyledButton from "../../../commonComponents/StyledButton";
import { useRouter } from "expo-router";
import axios from "axios";
import getServerUrl from "../../../../utils/getServerUrl";
import getErrorMessage from "../../../../utils/getErrorMessage";
import Tag from "../../../commonComponents/Tag";
import { RecipeType } from "../../../../types/RecipeTypes";
import getAuthToken from "../../../../utils/getAuthToken";
import * as ImagePicker from "expo-image-picker";
import * as FilesSystem from "expo-file-system";
import firebase from "../../../../firebaseConfig";

const imagesSamples: string[] = [];

for (let i = 1; i <= 5; i++) {
  imagesSamples.push(`https://picsum.photos/seed/${i + 1}/200/200`);
}

interface Props {
  draft?: RecipeType;
  setDraft?: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
  onClickNext?: (section: string) => void;
}

function RecipeDetailsForm({ draft, setDraft, onClickNext }: Props) {
  const [title, setTitle] = useState<string>(draft?.title || "");
  const [description, setDescription] = useState<string>(
    draft?.description || ""
  );
  const [prepTime, setPrepTime] = useState<string>(
    draft?.prepTime.toString() || ""
  );
  const [cookTime, setCookTime] = useState<string>(
    draft?.cookTime.toString() || ""
  );
  const [serving, setServing] = useState<string>(
    draft?.serving.toString() || ""
  );
  const [categories, setCategories] = useState<string[]>(
    draft?.categories || []
  );
  const [categoryValue, setCategoryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [image, setImage] = useState<string | null>();
  const [uploadingImages, setUploadingImages] = useState<boolean>(false);

  const router = useRouter();

  const handleAddCategories = () => {
    const newCategories = categoryValue
      .split(/,|\n/)
      .map((c) => c.trim().toLowerCase())
      .filter((c) => c);

    setCategories([...new Set([...categories, ...newCategories])]);
    setDraft && draft && setDraft({ ...draft, categories: newCategories });
    setCategoryValue("");
  };

  const saveNewRecipeDraft = async () => {
    setLoading(true);

    const body = {
      title,
      description,
      prepTime,
      cookTime,
      serving,
      categories,
    };

    axios
      .post(getServerUrl() + "/recipe/draft", body, {
        headers: { Authorization: await getAuthToken() },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setLoading(false);
          router.push(`/recipes/draft/${res.data._id}?section=requirements`);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(getErrorMessage(error).message);
        return setLoading(false);
      });
  };

  const handleClickNext = async () => {
    if (!draft) {
      saveNewRecipeDraft();
    } else {
      onClickNext && onClickNext("requirements");
    }
  };

  const handleRemoveCategory = async (category: string) => {
    setCategories(categories.filter((c) => c !== category));
    const newCategories = categoryValue
      .split(/,|\n/)
      .map((c) => c.trim().toLowerCase());
    setDraft && draft && setDraft({ ...draft, categories: newCategories });
  };

  const handleDeleteImage = async (uri) => {
    console.log(uri);
  };

  const handleClickAddImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    if (!image) return;
    try {
      const { uri } = await FilesSystem.getInfoAsync(image);
      const blob = (await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      })) as Blob;

      const filename = image?.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);

      console.log(ref);
      setUploadingImages(false);
      setImage(null);
    } catch (error) {
      console.log(error);
      setUploadingImages(false);
    }
  };

  return (
    <View>
      <View style={styles.main}>
        {!draft && (
          <>
            <Text style={styles.header}>Create a New Recipe</Text>
            <Text style={styles.subHeader}>
              Enter the following information to upload your own recipe.
            </Text>
          </>
        )}
        <View style={{ rowGap: 20 }}>
          <View style={styles.imageContainer}>
            <FlatList
              horizontal
              data={[...imagesSamples, "add"]}
              renderItem={(el) => {
                if (el.item !== "add") {
                  return (
                    <View>
                      <Image
                        source={{ uri: el.item }}
                        style={{ width: 200, aspectRatio: 1, borderRadius: 10 }}
                      />
                      <Pressable
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          zIndex: 1,
                          backgroundColor: "rgba(0,0,0,.5)",
                          padding: 10,
                          borderRadius: 50,
                        }}
                        onPress={() => handleDeleteImage(el.item)}
                      >
                        <Icon name="delete" color={colors.danger} />
                      </Pressable>
                    </View>
                  );
                } else {
                  return (
                    <Pressable
                      onPress={handleClickAddImage}
                      style={{
                        width: 200,
                        aspectRatio: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.grey,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <Icon name="add" />
                      <Text>Add Image</Text>
                    </Pressable>
                  );
                }
              }}
              keyExtractor={(el) => el}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
          <View>
            <HelperText type="error" visible={!title}>
              * Required
            </HelperText>
            <TextInput
              label="Title"
              placeholder="Recipe Title"
              value={title}
              onChangeText={setTitle}
              numberOfLines={2}
            />
          </View>

          <View>
            <HelperText type="error" visible={!description}>
              * Required
            </HelperText>
            <TextInput
              label="Description"
              placeholder="Recipe Description"
              value={description}
              onChangeText={setDescription}
              numberOfLines={4}
              multiline
            />
          </View>

          <Row
            onlyWeb
            style={{ columnGap: 20, rowGap: Platform.OS !== "web" ? 20 : 0 }}
          >
            <View style={styles.column}>
              <HelperText type="error" visible={!prepTime}>
                * Required
              </HelperText>
              <TextInput
                style={styles.column}
                keyboardType="numeric"
                label="Prep Time"
                value={prepTime}
                onChangeText={setPrepTime}
                placeholder={"Enter prep time"}
              />
            </View>

            <View style={styles.column}>
              <HelperText type="error" visible={!cookTime}>
                * Required
              </HelperText>
              <TextInput
                style={styles.column}
                keyboardType="numeric"
                label="Cook Time"
                value={cookTime}
                onChangeText={setCookTime}
                placeholder={"Enter cook time"}
              />
            </View>

            <View style={styles.column}>
              <HelperText type="error" visible={!serving}>
                * Required
              </HelperText>
              <TextInput
                style={styles.column}
                keyboardType="numeric"
                label="Serving"
                value={serving}
                onChangeText={setServing}
                placeholder={"Enter number of servings"}
              />
            </View>
          </Row>
          <Row
            onlyWeb
            style={{ columnGap: 20, rowGap: Platform.OS !== "web" ? 20 : 0 }}
          >
            <View style={styles.column}>
              <HelperText type="info" visible={!serving}>
                Optional
              </HelperText>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <TextInput
                  style={{ flex: 1 }}
                  label="Add Categories"
                  placeholder="Enter categories. You can add multiple categories by separating them with comma or new line"
                  value={categoryValue}
                  onChangeText={setCategoryValue}
                  numberOfLines={4}
                  multiline
                />
                <Button icon="plus" onPress={handleAddCategories}>
                  Add
                </Button>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Categories:</Text>
              <View style={styles.categories}>
                {categories.map((category) => (
                  <Tag
                    key={category}
                    icon={
                      <Icon name="close" type="material-community" size={16} />
                    }
                    iconOnpress={() => handleRemoveCategory(category)}
                  >
                    {category}
                  </Tag>
                ))}
              </View>
            </View>
          </Row>
        </View>
      </View>

      {!draft && (
        <Row style={styles.footer}>
          <StyledButton
            buttonColor={colors.grey}
            onPress={() => router.push("/")}
          >
            Cancel
          </StyledButton>
          <StyledButton
            buttonColor={colors.highlight}
            onPress={handleClickNext}
            disabled={loading}
          >
            Next
          </StyledButton>
        </Row>
      )}
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        wrapperStyle={styles.feedback}
        action={{
          label: "Close",
          onPress: () => {
            setError(null);
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    marginBottom: 48,
    maxWidth: 700,
    marginHorizontal: "auto",
  },
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
  imageContainer: {},
  column: {
    flex: 1,
  },
  footer: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    justifyContent: "space-between",
    columnGap: 20,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  feedback: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

export default RecipeDetailsForm;
