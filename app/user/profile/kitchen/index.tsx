import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../../../theme/colors";
import axios from "axios";
import getServerUrl from "../../../../utils/getServerUrl";
import getAuthToken from "../../../../utils/getAuthToken";
import getErrorMessage from "../../../../utils/getErrorMessage";
import { Button, TextInput } from "react-native-paper";
import Row from "../../../../components/commonComponents/Row";
import Tag from "../../../../components/commonComponents/Tag";
import { Icon } from "react-native-elements";
import { observer } from "mobx-react-lite";
import { useAuthStore } from "../../../../stores/authStore";

function ProfileView() {
  const {
    userEquipment,
    userIngredients,
    setUserEquipment,
    setUserIngredients,
  } = useAuthStore();

  const [equipmentValue, setEquipmentValue] = useState<string>("");
  const [ingredientValue, setIngredientValue] = useState<string>("");

  const handleAddMyEquipment = async () => {
    const equipmentArr = equipmentValue
      .split(/,|\n/)
      .map((c) => c.trim().toLowerCase());

    const newEquipment = [
      ...new Set([...(userEquipment || []), ...equipmentArr]),
    ];

    axios
      .post(
        getServerUrl() + "/user/addEquipment",
        { equipment: newEquipment },
        { headers: { Authorization: await getAuthToken() } }
      )
      .then((res) => {
        if (res.data) {
          setUserEquipment(res.data);
          setEquipmentValue("");
        }
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
    // Add new equipment to the current state and global state
    //setGlobalEquipments([...GlobalEquipments, ...newEquipment]);
  };

  const handleAddIngredients = async () => {
    const ingredientsArr = ingredientValue
      .split(/,|\n/)
      .map((i) => i.trim().toLowerCase());

    const newIngredients = [
      ...new Set([...(userIngredients || []), ...ingredientsArr]),
    ];

    axios
      .post(
        getServerUrl() + "/user/addIngredients",
        { ingredients: newIngredients },
        { headers: { Authorization: await getAuthToken() } }
      )
      .then((res) => {
        if (res.data) {
          setUserIngredients(res.data);
          setIngredientValue("");
        }
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
    // Add new equipment to the current state and global state
    //setGlobalEquipments([...GlobalEquipments, ...newEquipment]);
  };

  const handleRemoveEquipment = async (value: string) => {
    axios
      .post(
        getServerUrl() + "/user/removeEquipment",
        { equipment: value },
        { headers: { Authorization: await getAuthToken() } }
      )
      .then((res) => {
        if (res.data) {
          setUserEquipment(res.data);
        }
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
  };

  const handleRemoveIngredient = async (value: string) => {
    axios
      .post(
        getServerUrl() + "/user/removeIngredient",
        { ingredient: value },
        { headers: { Authorization: await getAuthToken() } }
      )
      .then((res) => {
        if (res.data) {
          setUserIngredients(res.data);
        }
      })
      .catch((error) => {
        console.log(getErrorMessage(error));
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content]}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>MyKitchen</Text>
          </View>
        </View>
        <View>
          <View style={styles.tagContainer}>
            {userEquipment?.map((e) => (
              <Tag
                key={e}
                icon={<Icon name="close" type="material-community" size={16} />}
                iconOnpress={() => handleRemoveEquipment(e)}
              >
                {e}
              </Tag>
            ))}
          </View>
          <Row gap={10} style={styles.inputRow}>
            <TextInput
              style={styles.tagInput}
              value={equipmentValue}
              onChangeText={setEquipmentValue}
              label="Add Equipment"
              placeholder="frying pan, oven, food processor"
              onSubmitEditing={handleAddMyEquipment}
            />
            <Button
              icon="plus"
              onPress={handleAddMyEquipment}
              disabled={!equipmentValue}
            >
              Add
            </Button>
          </Row>
        </View>
      </View>

      <View style={[styles.content]}>
        <View>
          <View style={styles.tagContainer}>
            {userIngredients?.map((i) => (
              <Tag
                key={i}
                icon={<Icon name="close" type="material-community" size={16} />}
                iconOnpress={() => handleRemoveIngredient(i)}
              >
                {i}
              </Tag>
            ))}
          </View>
          <Row gap={10} style={styles.inputRow}>
            <TextInput
              style={styles.tagInput}
              value={ingredientValue}
              onChangeText={setIngredientValue}
              label="Add Ingredients"
              placeholder="chicken, salt, pepper"
              onSubmitEditing={handleAddIngredients}
            />
            <Button
              icon="plus"
              onPress={handleAddIngredients}
              disabled={!ingredientValue}
            >
              Add
            </Button>
          </Row>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  content: {
    maxWidth: 900,
    width: "100%",
    marginBottom: 25,
  },
  profilePicture: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
  },
  headerContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 10,
    textAlign: "left",
  },
  label: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: "left",
  },
  input: {
    height: 60,
    color: "black",
    width: "100%",
    borderColor: "#E6E0E9",
    backgroundColor: "#E6E0E9",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  btn: {
    textAlign: "center",
    backgroundColor: "#FAAE2B",
    width: "100%",
    marginTop: 20,

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#00332C",
    backgroundColor: "#FAAE2B",
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  inputRow: {
    alignItems: "center",
  },
  tagInput: {
    width: "100%",
    maxWidth: 500,
  },
});

export default observer(ProfileView);
