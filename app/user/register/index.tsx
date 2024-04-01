import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { firebaseAuth } from "../../../firebase/firebaseApp";
import axios from "axios";
import { Checkbox, Snackbar } from "react-native-paper";
import getServerUrl from "../../../utils/getServerUrl";
import colors from "../../../theme/colors";

interface Status {
  type: "success" | "failed";
  message: string;
}

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async () => {
    const newErrorMessages = [];

    if (!firstName) {
      newErrorMessages.push("First Name is required");
    }
    if (!lastName) {
      newErrorMessages.push("Last Name is required");
    }
    if (!email) {
      newErrorMessages.push("Email is required");
    }
    if (!phone) {
      newErrorMessages.push("Contact Number is required");
    }
    if (!username) {
      newErrorMessages.push("Username is required");
    }
    if (!password) {
      newErrorMessages.push("Password is required");
    }
    if (!confirmPassword) {
      newErrorMessages.push("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      newErrorMessages.push("Password should match");
    }
    if (!isChecked) {
      newErrorMessages.push("Please agree to the Terms and Conditions and Privacy Policy to sign-up");
    }

    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length) {
      return;
    }
    console.log(`${getServerUrl()}/user`);
    axios
      .post(`${getServerUrl()}/user`, {
        firstName,
        lastName,
        email,
        phone,
        username,
        password,
        confirmPassword,
      })
      .then(function (response) {
        setStatus({
          type: "success",
          message: "You have registered successfully. Please login.",
        });
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        if (error.response?.data) {
          return setStatus({ type: "failed", message: error.response.data });
        } else {
          return setStatus({ type: "failed", message: error.message });
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content]}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create an account</Text>
          <View style={styles.errorContainer}>
            {errorMessages.map((message) => (
              <Text key={message} style={styles.errorMessage}>
                {message}
              </Text>
            ))}
          </View>
          <Text style={styles.subHeader}>
            Enter the following information to create an account
          </Text>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.column]}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={[styles.column]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View  style={styles.termsContainer}>
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
              /> 

              <Text >
                I agree with My Only Pans 
                <Link href="/privacy/terms" style={styles.link}>
                  {" "}
                    Tersms and Conditions 
                </Link>

                <Text> and</Text>

                <Link href="/privacy" style={styles.link}>
                  {" "}
                    Privacy Policy
                </Link>
              </Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Sign-up</Text>
            </TouchableOpacity>
            <Text style={styles.subHeader}>
              Already have an account?
              <Link href="/user/login" style={styles.link}>
                {" "}
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </View>
      <Snackbar
        wrapperStyle={styles.feedback}
        visible={!!status}
        onDismiss={() => setStatus(null)}
        action={
          status?.type === "success"
            ? {
                label: "Login",
                onPress: () => {
                  router.push("/user/login");
                },
              }
            : {
                label: "Close",
                onPress: () => {
                  setStatus(null);
                },
              }
        }
      >
        {status?.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "web" ? 80 : 0,
    alignItems: "center",
    padding: 20,
    flex: 1,
    width: "100%",
  },
  content: {
    maxWidth: 900,
    width: "100%",
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
  errorContainer: {
    height: 170,
    padding: 20,
  },
  errorMessage: {
    color: "#C1554D",
  },
  row: {
    flexDirection: Platform.OS !== "web" ? "column" : "row",
    gap: 20,
    flex: 1,
  },
  column: {
    flexGrow: 1,
    flexShrink: 0,
    gap: 20,
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
    // borderColor: "#D8DDDB",
    // backgroundColor: "#D8DDDB",
    borderColor: "#E6E0E9",
    backgroundColor: "#E6E0E9",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Registration;
