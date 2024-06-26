import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph, Button, Text } from 'react-native-paper';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/text';


interface Props {}


const TermsAndConditionsPage: React.FC = (props : Props) => {
    const {} = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="displayLarge" style={[styles.headline,textStyles.h1]}>Terms and Conditions</Text>

      <View style={styles.content}>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
          Welcome to My Only Pans! These Terms and Conditions ("Terms") govern your use of our website and application. By accessing or using our platform, you agree to these Terms. Please read them carefully.
        </Text>
        
        <Title style={[styles.title, textStyles.h3]}>Acceptance of Terms</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
          By using our platform, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these Terms, please refrain from using our platform.
        </Text>
        
        <Title style={[styles.title, textStyles.h3]}>User Accounts</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            You may need to create an account to access certain features. You're responsible for maintaining the confidentiality of your account and notifying us of any unauthorized use.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Community Guidelines</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            Please follow our Community Guidelines. We reserve the right to remove any content that violates these guidelines or our Terms.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Intellectual Property</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            We own our platform and its contents and protect them under intellectual property laws.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Privacy</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            Your privacy is important to us. Please review our Privacy Policy to learn how we collect, use, and disclose your information.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Disclaimer of Warranties</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            We provide the platform on an "as is" basis and do not guarantee its uninterrupted or error-free operation.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Limitation of Liability</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            We shall not be liable for any indirect, consequential, or incidental damages arising from your use of the platform.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Governing Law</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            These Terms shall be governed by Ontario's laws.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Changes to Terms </Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
            We reserve the right to modify these Terms at any time. Your continued use of the platform after changes constitute acceptance of the revised Terms.
        </Text>

        <Title style={[styles.title, textStyles.h3]}>Contact Us</Title>
        <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>If you have any questions about these Terms, please contact us at privacy@myonlypans.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    marginLeft: 20
  },
  content: {
    marginBottom: 15,
    marginLeft: 30
  },
  headline:{
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title:{
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph:{
    color: colors.paragraph,
    marginBottom: 15,
  },
});

export default TermsAndConditionsPage;
