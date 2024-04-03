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
import { toJS } from "mobx";
import { MyProfileType } from "../../../types/UserTypes";

function ProfileView() {
  const { logout, myProfile } = useAuthStore();
  const [editableFields, setEditableFields] = useState(false);

  const { _id, username, firstName, lastName, phone, email, imageUrl } =
    myProfile as MyProfileType;

  console.log(toJS(myProfile));

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
    <Container centerVertically>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.header}>MyProfile</Text>

            <View style={styles.profilePicture}>
              <Image
                source={
                  imageUrl
                    ? { uri: imageUrl }
                    : require("../../../assets/team/placeholder-avatar.png")
                }
                style={styles.image}
              />
            </View>
            <Text
              style={styles.userFullName}
            >{`${firstName} ${lastName}`}</Text>
            <Text style={styles.userName}>@{username}</Text>
          </View>

          <View style={styles.contact}>
            <View>
              <Text style={styles.label}>Email Address</Text>
              <Text>{email}</Text>
            </View>
            <View>
              <Text style={styles.label}>Contact Number</Text>
              <Text>{phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <StyledButton
            style={styles.btn}
            buttonColor="#ccc"
            onPress={handleLogout}
          >
            Logout
          </StyledButton>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
    width: "100%",
    marginHorizontal: "auto",
  },
  card: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 48,
    borderRadius: 10,
    marginBottom: 24,
    gap: 24,
  },
  row: {
    flexDirection: Platform.OS !== "web" ? "column" : "row",
    gap: 20,
  },
  contact: {
    // flexGrow: 1,
    flexShrink: 0,
    gap: 20,
  },
  info: {
    alignItems: "center",
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
  },
  userName: {
    fontSize: 20,
    // marginBottom: 15,
    // marginTop: 10,
  },
  bio: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
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
