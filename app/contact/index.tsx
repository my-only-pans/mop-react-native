import { Link, router } from "expo-router";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../theme/colors";
import spaceStyles from "../../theme/spaces";
import textStyles, { fontSizes } from "../../theme/text";
import { TextInput, Button } from "react-native-paper";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import Container from "../../components/commonComponents/Container";
import Row from "../../components/commonComponents/Row";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.secContainer}>
      <View style={spaceStyles.headerContainer}>
        <View>
          <Text style={styles.sectionTitle}>Contact Us Form</Text>
          <Text style={styles.sectionText}>
            Please enter your email and inquiry here
          </Text>
        </View>
      </View>
      <View style={[spaceStyles.content, styles.content]}>
        <View style={[spaceStyles.row]}>
          <View style={spaceStyles.column}>
            <Text style={styles.header}><Icon name="envelope" size={20} color="#00473E" style={{ marginRight: 10 }} />MyOnlyPan@gmail.com</Text>
            <Text style={styles.header}><Icon name="phone" size={20} color="#00473E" style={{ marginRight: 10 }}/>Phone Number: 000-000-000</Text>
          
          <View style={[spaceStyles.column]}>
            <View style={[spaceStyles.row]}>
              <View style={[spaceStyles.column]}>
                <TextInput
                  onChangeText={setFirstName}
                  value={email}
                  placeholder="First Name"
                  label="First Name"
                />
              </View>
              <View style={[spaceStyles.column]}>
                <TextInput
                  onChangeText={setLastName}
                  value={email}
                  placeholder="Last Name"
                  label="Last Name"
                />
              </View>
            </View>
            <View style={spaceStyles.row}>
              <View style={spaceStyles.column}>
                <TextInput
                  onChangeText={setEmail}
                  value={email}
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>

              <View style={spaceStyles.column}>
                <TextInput
                  onChangeText={setPhoneNum}
                  value={email}
                  placeholder="Phone"
                  label="Phone Number"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={spaceStyles.column}>
              <TextInput
                style={[{ height: 300 }]}
                onChangeText={setMessage}
                value={message}
                placeholder="Message"
                multiline
              />
            </View>

            <View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
  
        <View>
            <View>
              <Text style={[styles.header]}>Socialize with Us</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => console.log("Icon 1 Pressed")}
              >
                {/* <Image style={styles.icon} /> */}
                <Icon name="instagram" size={30} color="#00473E" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => console.log("Icon 2 Pressed")}
              >
                {/* <Image style={styles.icon} /> */}
                <Icon name="facebook" size={30} color="#00473E" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => console.log("Icon 3 Pressed")}
              >
                {/* <Image style={styles.icon} /> */}
                <Icon name="linkedin" size={30} color="#00473E" />
              </TouchableOpacity>
            </View>
        </View>
        </View>
        </View>
       </View>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginLeft: 20
  },
  secContainer: {
    maxWidth:600, 
    marginHorizontal: 'auto'
  },
  content: {
    marginTop: 20,
    justifyContent: "center",
    // alignItems: "c",
    maxWidth: "100%",
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  img: {
    padding: 80,
    marginBottom: 20,
    backgroundColor: "#00473E",
    borderRadius: 20,
  },
  sectionTitle: {
    color:  colors.headline,
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 22,
  },
  sectionText: {
    color: colors.paragraph,
    fontSize: 15,
  },
  headerContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginLeft: 20
  },
  // row: {
  //   flexDirection: "row",
  //   marginBottom: 20,
  // },
  // column: {
  //   flex: 1,
  //   marginRight: 10,
  // },
  left:{
    marginRight: 30,
    maxWidth: 600,

  },
  right: {
    marginLeft: 30,
    
  },
  header: {
    color: colors.headline,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10, 
    textAlign: "center",
    flexDirection: "row", 
    alignItems: "center", 
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 10,
    textAlign: "left",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#E6E0E9",
    backgroundColor: "#E6E0E9",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "#00332C",
  },

  btn: {
    backgroundColor: "#FAAE2B",
    width: "60%",
    alignSelf: "center", 
    marginTop: 20, 
    paddingVertical: 20, 
    paddingHorizontal: 80,
    borderRadius: 60,
  },
  btnText: {
    textAlign: "center",
    color: "#00332C",
    fontSize: 18,
  },
  
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 50,
  },
  icon: {
    justifyContent: 'space-between'
  },
  socials: {

  },
});

export default Contact;
