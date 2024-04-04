import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/text';


const CommunityGuidelines = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
      <Text variant="displayLarge" style={[styles.headline,textStyles.h1]}>Community Guidelines</Text>

      <Title style={[styles.title, textStyles.h3]}>Respect Others</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Treat fellow users with kindness, respect, and empathy. Harassment, bullying, hate speech, discrimination, or any form of abusive behavior will not be tolerated.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Be Constructive</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Provide constructive feedback when reviewing recipes or interacting with other users. Share tips, suggestions, and encouragement to help each other improve and learn.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Original Content</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Only post recipes, reviews, and content that you have the right to share. Respect copyright and intellectual property rights, and give proper credit to the original creators when sharing recipes or content.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Accuracy and Authenticity</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Ensure that the information you share is accurate and truthful. Avoid spreading misinformation or false claims, especially regarding health or safety-related matters.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Respect Privacy</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Respect the privacy and personal information of others. Do not share personal information without consent, and refrain from engaging in unauthorized data collection or stalking behavior.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Stay On Topic</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Keep discussions and interactions relevant to the theme of cooking, recipes, and related topics. Avoid off-topic discussions that may detract from the community's focus.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Adhere to Terms of Use</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Follow the terms of use and guidelines outlined by My Only Pans. Refrain from engaging in activities that violate the terms of use or legal regulations.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Report Violations</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        If you encounter any violations of these guidelines or observe inappropriate behavior, please report it to the moderators or administrators immediately. This will help us maintain a safe and welcoming community for all users.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Be Patient and Supportive</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Remember that everyone is at different skill levels and stages of their culinary journey. Offer support, guidance, and encouragement to beginners and experienced cooks alike.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Have Fun!</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Most importantly, have fun exploring new recipes, sharing culinary experiences, and connecting with fellow food enthusiasts. Let's create a vibrant and engaging community together!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  headline:{
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title:{
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 15
  },
  paragraph:{
    color: colors.paragraph,
    marginBottom: 15,
    marginLeft: 25
  },

});

export default CommunityGuidelines;
