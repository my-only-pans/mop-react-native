import React from "react";
import { View, StyleSheet, ScrollView, Image, Platform } from "react-native"; // Import Platform
import { Text } from "react-native-paper";
import colors from "../../../theme/colors";

const About_Us_Page = () => {
  const values = [
    "Inclusivity: We celebrate diversity and welcome all voices in our community.",
    "Empowerment: We help home cooks experiment, learn, and grow their skills.",
    "Connection: We believe food brings people together and fosters meaningful relationships.",
    "Quality: We are dedicated to providing top-notch content and user experience.",
  ];

  const teamMembers = [
    {
      name: "Charie Hare",
      position: "Web Developer",
      image: require("../../../assets/team/Charie - Gyoza dumplings.png"),
    },
    {
      name: "Hector Robles",
      position: "Web Developer",
      image: require("../../../assets/team/hector.jpg"),
    },
    {
      name: "Mary Leviel Ame Nicolas",
      position: "Web Developer",
      image: require("../../../assets/team/Leviel - Bibimbap.jpg"),
    },
    {
      name: "Socheat Keo",
      position: "Web Developer",
      image: require("../../../assets/team/socheat.jpg"),
    },
    {
      name: "Tanya Ntoto Masiala ",
      position: "Web Developer",
      image: require("../../../assets/team/Tanya - sweet-fried-plantains.png"),
    },
  ];

  const defaultImage = require("../../../assets/team/placeholder-avatar.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View>
          <Text variant="headlineLarge" style={styles.heading}>
            About Us
          </Text>
        </View>
        <br />

        <View style={styles.section}>
          <Text variant="bodyLarge" style={styles.sectionText}>
            At My Only Pans, we believe in the magic of homemade meals to bring
            joy, creativity, and connections to people's lives. We're dedicated
            to empowering home cooks, food enthusiasts, and culinary explorers
            to share delicious recipes in our welcoming community.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Company Overview
          </Text>

          <Text variant="bodyLarge" style={styles.sectionText}>
            My Only Pans is a place where food lovers of all levels can
            discover, share, and celebrate their passion for cooking. Our
            platform is easy to use, allowing you to search, view, post, review,
            and rate recipes from various contributors and authors.
          </Text>
          <br />

          <Text variant="bodyLarge" style={styles.sectionText}>
            But we're more than just recipes. We know that great meals start
            with the right ingredients and tools. That's why we let you list
            what's in your fridge and kitchen equipment and use tags to find
            recipes that suit your tastes and setup.
          </Text>
          <br />

          <Text variant="bodyLarge" style={styles.sectionText}>
            Whether you're a seasoned chef or new to cooking, My Only Pans is
            your destination for culinary exploration and inspiration.
          </Text>
        </View>
        <br />

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Mission and Values
          </Text>

          <Text variant="bodyLarge" style={styles.sectionText}>
            Our mission is to encourage and enable everyone to explore their
            culinary creativity, one recipe at a time. We're dedicated to
            creating a supportive community that embraces everyone, regardless
            of background or experience.
          </Text>
          <br />

          <Text variant="bodyLarge" style={styles.sectionText}>
            Our core values guide us:
            <br />
            <View style={styles.value_section}>
              {values.map((value, index) => (
                <Text key={index} style={styles.value}>
                  {`${index + 1}. ${value}\n `}
                </Text>
              ))}
            </View>
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            USP (Unique Selling Proposition)
          </Text>

          <Text variant="bodyLarge" style={styles.sectionText}>
            What makes My Only Pans unique is our new approach to culinary
            exploration. We offer more than just recipes. Our unique features,
            like fridge inventory, equipment lists, and customizable search
            tags, give you a personalized cooking experience tailored to your
            preferences.
          </Text>

          <br />

          <Text variant="bodyLarge" style={styles.sectionText}>
            Whether you're making a quick weeknight meal or planning a fancy
            dinner party, My Only Pans gives you the tools and inspiration to
            cook with confidence and creativity. Join us in reinventing how
            people cook, eat, and connect through homemade meals.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.teamSectionTitle}>
            Meet the Team
          </Text>

          <View style={styles.teamMemberContainer}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMemberInfo}>
                <Image
                  source={member.image}
                  style={styles.teamMemberImage}
                  onError={() => defaultImage}
                />

                <View style={styles.textContainer}>
                  <Text variant="bodyLarge">{member.name}</Text>
                  <Text variant="bodyLarge">{member.position}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginLeft: 20,
  },
  heading: {
    color: colors.headline,
    fontWeight: "bold",
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
    marginLeft: 20,
  },
  sectionTitle: {
    color: colors.headline,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionText: {
    marginLeft: 15,
    color: colors.paragraph,
  },
  bold: {
    fontWeight: "bold",
  },
  value_section: {
    marginBottom: 15,
    marginLeft: 20,
  },
  value: {
    paddingVertical: 5,
    fontWeight: "bold",
  },
  teamSectionTitle: {
    flex: 1,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    textAlign: "center",
    color: colors.headline,
  },
  teamMemberContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
  },
  teamMemberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    marginBottom: 5,
  },
  teamMemberInfo: {
    alignItems: "center",
    marginBottom: 10,
    ...Platform.select({
      web: {
        flexDirection: "column",
      },
    }),
  },
  textContainer: {
    alignItems: "center",
  },
});

export default About_Us_Page;
