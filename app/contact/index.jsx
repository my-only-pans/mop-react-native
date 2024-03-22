import { Link, router } from "expo-router";
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

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Contact Information</Text>
        <View>
          <Text style={styles.subHeader}>MyOnlyPan@gmail.com</Text>
          <Text style={styles.subHeader}>Phone Number: 000-000-000</Text>
        </View>
        <View>
          <Text style={styles.subHeader}>FAQ</Text>
          <Text style={styles.subHeader}>Q1-ANS</Text>
          <Text style={styles.subHeader}>Q2-ANS</Text>
          <Text style={styles.subHeader}>Q3-ANS</Text>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Contact Form</Text>
        <Text>Please enter your email and inquiry here</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
            placeholder="Message"
            multiline
 q          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.smHeader}>Socialize with Us</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => console.log("Icon 1 Pressed")}
        >
          {/* <Image style={styles.icon} /> */}
          <Text>Icon1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => console.log("Icon 2 Pressed")}
          >
            {/* <Image style={styles.icon} /> */}
            <Text>Icon2</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => console.log("Icon 3 Pressed")}
        >
          {/* <Image style={styles.icon} /> */}
          <Text>Icon3</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f3f3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "left",
  },
  input: {
    height: 60,
    borderColor: "#E6E0E9",
    backgroundColor: "#E6E0E9",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: '100%',
  },
  btn: {
    textAlign: "center",
    backgroundColor: "#FAAE2B",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 40,
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    color: "#00332C",
    backgroundColor: "#FAAE2B",
    fontSize: 16,
  },
  smHeader: {
    textAlign: "center",
    marginTop: 20,
  },

  iconContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },

  row: {
    flexDirection: Platform.OS !== "web" ? "column" : "row",
    gap: 20,
  },
  column: {
    flexShrink: 0,
    flexGrow: 1,
    gap: 0,
  },
});

export default Contact;
