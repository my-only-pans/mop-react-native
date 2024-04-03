import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import Container from "../../../components/commonComponents/Container";
import StyledButton from "../../../components/commonComponents/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../theme/colors";
import { useAuthStore } from "../../../stores/authStore";

function ProfileView() {
  const { logout, myProfile } = useAuthStore();
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
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
    logout();

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
          mauris ac.
        </Text>
      </View>

      <View style={styles.column}>
        <View style={[styles.row]}>
          <View style={styles.column}>
            <TextInput
              style={styles.input}
              placeholder="levielk@gmail.com"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
          </View>

          <View style={styles.column}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={false}
            />
          </View>

          <View style={styles.column}>
            <TextInput
              style={styles.input}
              placeholder="+647-711-9111"
              value={contactNumber}
              onChangeText={setContactNumber}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Dietary Preference:</Text>
          <TextInput
            style={styles.input}
            placeholder="Vegan"
            value={dietaryPreference}
            onChangeText={setDietaryPreference}
            editable={editableFields}
          />
        </View>

        {/* <View style={styles.buttonContainer}> */}
        <View style={{ gap: 10, width: "45%" }}>
          <StyledButton
            style={styles.btn}
            onPress={!editableFields ? handleClickEdit : handleClickSave}
          >
            {editableFields ? "Save" : "Edit Preferences"}
          </StyledButton>
        </View>
        {/* </View> */}

        <View style={styles.divider}></View>
      </View>

      <View style={styles.buttonContainer}>
        {/* <View style={{ gap: 10, width: "120%" }}> */}
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
          style={styles.btn}
          buttonColor="#ccc"
          onPress={handleLogout}
        >
          Logout
        </StyledButton>
        {/* </View> */}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "web" ? 80 : 0,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    maxWidth: 700,
    marginHorizontal: "auto",
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: Platform.OS !== "web" ? "column" : "row",
    gap: 20,
  },
  column: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 20,
  },
  divider: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  profilePicture: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 43,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 30,
    textAlign: "left",
  },
  userFullName: {
    fontSize: 20,
    paddingTop: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  userName: {
    fontSize: 20,
    // marginBottom: 15,
    // marginTop: 10,
    textAlign: "left",
  },
  bio: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "left",
  },
  label: {
    paddingBottom: 10,
    paddingTop: 10,
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
    // marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    // flex: 1,
    textAlign: "center",
    backgroundColor: "#FAAE2B",
    marginTop: 20,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
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
    width: 100,
    height: 100,
  },
});

export default ProfileView;
