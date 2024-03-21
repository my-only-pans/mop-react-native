import { Link } from "expo-router";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { firebaseAuth } from "../../../firebase/firebaseApp";
import colors from "../../../theme/colors";
import axios from "axios";
import getServerUrl from "../../../utils/getServerUrl";

interface FirebaseUser extends User {
  accessToken?: string; // Extend the interface to include accessToken
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getAuthToken = async (firebaseToken: string) => {
    const {
      data: { authToken },
    } = await axios.post(`${getServerUrl()}/user/login`, {
      firebaseToken,
    });

    if (!authToken) {
      throw new Error("Login failed. Please try again.");
    }

    axios
      .get(`${getServerUrl()}/user/myProfile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setLoading(false);

        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("Authorization="));

        if (authToken) {
          // Extract the value of the 'Authorization' cookie
          const tokenValue = authToken.split("=")[1];
          console.log("Authorization token:", tokenValue);
        } else {
          console.log("Authorization cookie not found");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(JSON.stringify(error));
        // if (error.response?.data) {
        //   return setStatus({ type: "failed", message: error.response.data });
        // } else {
        //   return setStatus({ type: "failed", message: error.message });
        // }
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user: FirebaseUser = userCredential.user;
        console.log(user.accessToken);

        if (user.accessToken) {
          getAuthToken(user.accessToken);
        } else {
          throw new Error("Invalid login credentials.");
        }
      })
      .catch((error) => {
        const errorCode = error?.code;
        const errorMessage = error?.message;

        console.log(errorCode, errorMessage);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.img}>
          <Text>Image Here</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to MyOnlyPans</Text>
        <Text style={styles.subHeader}>
          Enter the following information to Sign in
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Sign-in</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>
        Don't have an account yet?
        <Link href="/user/register" style={styles.link}>
          {" "}
          Sign-up here
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    maxWidth: 400,
    width: "100%",
    marginHorizontal: "auto",
  },
  img: {
    padding: 80,
    marginBottom: 20,
    backgroundColor: "#00473E",
    borderRadius: 20,
  },
  headerContainer: {
    alignItems: "flex-start",
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
  input: {
    height: 60,
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
  link: {
    color: colors.info,
  },
});

export default Login;
