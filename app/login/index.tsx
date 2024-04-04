import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import colors from "../../theme/colors";
import axios from "axios";
import getServerUrl from "../../utils/getServerUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar, TextInput } from "react-native-paper";
import Container from "../../components/commonComponents/Container";
import { useAuthStore } from "../../stores/authStore";

function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { authToken },
      } = await axios.post(`${getServerUrl()}/user/login`, {
        email,
        password,
      });

      if (!authToken) {
        throw new Error("Login failed. Please try again.");
      }

      const { data: myProfile } = await axios.get(
        `${getServerUrl()}/user/myProfile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const myProfileString = JSON.stringify(myProfile);

      login(authToken, myProfile);

      if (Platform.OS === "web") {
        localStorage.setItem("myProfile", myProfileString);
        localStorage.setItem("authToken", authToken);
      } else {
        AsyncStorage.setItem("myProfile", myProfileString);
        AsyncStorage.setItem("authToken", authToken);
      }

      router.push("/");
    } catch (error) {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Container centerVertically style={styles.container}>
      <View>
        <Pressable style={styles.img}>
          <Text>Image Here</Text>
        </Pressable>
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
        disabled={loading}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        disabled={loading}
      />

      <Pressable style={styles.btn} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.btnText}>Sign-in</Text>
      </Pressable>
      <Text style={styles.subHeader}>
        Don't have an account yet?
        <Link href="/register" style={styles.link}>
          {" "}
          Sign-up here
        </Link>
      </Text>
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
    </Container>
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
  feedback: {
    position: "absolute",
    top: 0,
  },
});

export default Login;
