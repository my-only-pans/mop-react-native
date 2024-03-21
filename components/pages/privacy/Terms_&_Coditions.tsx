import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph, Button, Text } from 'react-native-paper';
import colors from '../../../theme/colors';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface Props {}


const TermsAndConditionsScreen: React.FC = (props : Props) => {
    const {} = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.headline}>Terms and Conditions</Title>

      <View style={styles.content}>
        <Paragraph style={styles.paragraph}>
          Welcome to My Only Pans! These Terms and Conditions ("Terms") govern your use of our website and application. By accessing or using our platform, you agree to these Terms. Please read them carefully.
        </Paragraph>
        
        <Title style={styles.title}>Acceptance of Terms</Title>
        <Paragraph style={styles.paragraph}>
          By using our platform, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these Terms, please refrain from using our platform.
        </Paragraph>
        
        <Title style={styles.title}>User Accounts</Title>
        <Paragraph style={styles.paragraph}>
            You may need to create an account to access certain features. You're responsible for maintaining the confidentiality of your account and notifying us of any unauthorized use.
        </Paragraph>

        <Title style={styles.title}>Community Guidelines</Title>
        <Paragraph style={styles.paragraph}>
            Please follow our Community Guidelines. We reserve the right to remove any content that violates these guidelines or our Terms.
        </Paragraph>

        <Title style={styles.title}>Intellectual Property</Title>
        <Paragraph style={styles.paragraph}>
            We own our platform and its contents and protect them under intellectual property laws.
        </Paragraph>

        <Title style={styles.title}>Privacy</Title>
        <Paragraph style={styles.paragraph}>
            Your privacy is important to us. Please review our Privacy Policy to learn how we collect, use, and disclose your information.
        </Paragraph>

        <Title style={styles.title}>Disclaimer of Warranties</Title>
        <Paragraph style={styles.paragraph}>
            We provide the platform on an "as is" basis and do not guarantee its uninterrupted or error-free operation.
        </Paragraph>

        <Title style={styles.title}>Limitation of Liability</Title>
        <Paragraph style={styles.paragraph}>
            We shall not be liable for any indirect, consequential, or incidental damages arising from your use of the platform.
        </Paragraph>

        <Title style={styles.title}>Governing Law</Title>
        <Paragraph style={styles.paragraph}>
            These Terms shall be governed by Ontario's laws.
        </Paragraph>

        <Title style={styles.title}>Changes to Terms </Title>
        <Paragraph style={styles.paragraph}>
            We reserve the right to modify these Terms at any time. Your continued use of the platform after changes constitute acceptance of the revised Terms.
        </Paragraph>

        <Title style={styles.title}>Contact Us</Title>
        <Paragraph style={styles.paragraph}>If you have any questions about these Terms, please contact us at mop.help@inc.com</Paragraph>

        <Text variant="bodyLarge">By using our platform, you agree to these Terms and our Privacy Policy.</Text>
      </View>

      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Agree to Terms
      </Button>
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
    marginBottom: 20,
    marginLeft: 30
  },
  headline:{
    fontSize: 32,
    color: colors.headline,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title:{
    color: "black",
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph:{
    fontSize: 20,
    color: colors.paragraph,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.button,
    width: 200,
    alignSelf: 'center'
  },
});

export default TermsAndConditionsScreen;
