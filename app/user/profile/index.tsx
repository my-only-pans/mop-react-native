import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Container from "../../../components/commonComponents/Container";
import StyledButton from "../../../components/commonComponents/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileView() {
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepCook, setPrepCook] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [editableFields, setEditableFields] = useState(false);

  const router = useRouter();

  const handleClickEdit = () => {
    setEditableFields(!editableFields);
  };

  const handleClickSave = () => {
    setEditableFields(!editableFields);
    alert("Changes saved.");
  };

  const handleClickCancel = () => {
    setEditableFields(!editableFields);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("myProfile");
    AsyncStorage.removeItem("authToken");

    router.push("/");
  };

  return (
    <Container centerVertically style={styles.container}>
      <Text style={styles.header}>MyProfile</Text>

      <View style={styles.profilePicture}>
        <Image
          source={require("../../../assets/sample.png")}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.userFullName}>Leviel Kulet</Text>
        <Text style={styles.userName}>@levielkulet</Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida,
          mauris ac sodales semper, neque velit mollis velit, eget cursus lectus
          quam sit amet lacus.
        </Text>
      </View>

      <View>
        <Text style={styles.header}>MyPreferences</Text>
      </View>
      <Text style={styles.label}>Dietary Preference:</Text>
      <TextInput
        style={styles.input}
        placeholder="Vegan"
        value={dietaryPreference}
        onChangeText={setDietaryPreference}
        editable={editableFields}
      />
      <Text style={styles.label}>Cuisine:</Text>
      <TextInput
        style={styles.input}
        placeholder="Filipino"
        value={cuisine}
        onChangeText={setCuisine}
        editable={editableFields}
      />
      <Text style={styles.label}>Prep & Cook Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="1 hour"
        value={prepCook}
        onChangeText={setPrepCook}
        editable={editableFields}
      />
      <Text style={styles.label}>Serves:</Text>
      <TextInput
        style={styles.input}
        placeholder="2"
        value={servingSize}
        onChangeText={setServingSize}
        editable={editableFields}
      />

      <View style={styles.profilePicture}>
        <Image
          source={require("../../../assets/sample.png")}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.userFullName}>Leviel Kulet</Text>
        <Text style={styles.userName}>@levielkulet</Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida,
          mauris ac sodales semper, neque velit mollis velit, eget cursus lectus
          quam sit amet lacus.
        </Text>
      </View>

      <View>
        <Text style={styles.header}>MyPreferences</Text>
      </View>
      <Text style={styles.label}>Dietary Preference:</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={dietaryPreference}
        onChangeText={setDietaryPreference}
        editable={editableFields}
      />
      <Text style={styles.label}>Cuisine:</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={cuisine}
        onChangeText={setCuisine}
        editable={editableFields}
      />
      <Text style={styles.label}>Prep & Cook Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="In minutes"
        value={prepCook}
        onChangeText={setPrepCook}
        editable={editableFields}
      />
      <Text style={styles.label}>Serves:</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={servingSize}
        onChangeText={setServingSize}
        editable={editableFields}
      />

      <View style={{ gap: 10, width: "100%" }}>
        <StyledButton
          style={styles.btn}
          onPress={!editableFields ? handleClickEdit : handleClickSave}
        >
          {editableFields ? "Save" : "Edit Preferences"}
        </StyledButton>

        <StyledButton
          style={styles.btn}
          onPress={
            !editableFields
              ? () => {
                  router.push("/user/profile/update");
                }
              : handleClickCancel
          }
        >
          {editableFields ? "Cancel" : "Edit Profile"}
        </StyledButton>
        <StyledButton
          buttonColor="#ccc"
          style={{ width: "100%" }}
          onPress={handleLogout}
        >
          Logout
        </StyledButton>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    maxWidth: 900,
    marginHorizontal: "auto",
  },
  profilePicture: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
  },
  // container2: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#fff',
  //     padding: 20,
  // },
  // headerContainer: {
  //     // alignItems: 'flex-start',
  // },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  userFullName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  userName: {
    fontSize: 15,
    // marginBottom: 15,
    // marginTop: 10,
    textAlign: "center",
  },
  bio: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 10,
    textAlign: "center",
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
  image: {
    alignItems: "center",
    // marginTop: 10,
    width: 120,
    height: 120,
  },
});

export default ProfileView;
