import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';
import colors from '../../../theme/colors';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
      <Text variant="displayLarge" style={styles.headline}>Privacy Policy</Text>

      <Text style={styles.paragraph}>
        Welcome to My Only Pans! This privacy policy explains how we collect, use, and protect your personal information when you use our website and application to discover, share, and create recipes. We are committed to safeguarding your privacy and ensuring the security of your data.
      </Text>

      <Title style={styles.title}>Information We Collect</Title>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Personal Information:</Text> When you sign up for an account, we may collect your name, email address, and, optionally, other profile information.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Recipe Information:</Text> We collect recipes you post, review, or rate, including any photos or comments you provide.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Fridge Contents and Equipment:</Text> Users can list the ingredients they have in their fridge and the equipment they own. This information is used to personalize recipe recommendations and calibrate recipes.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Usage Data:</Text> We collect information about how you interact with our website and application, such as pages visited, searches made, and features used.
      </Text>

      <Title style={styles.title}>How We Use Your Information</Title>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Personalization:</Text> We use your information to personalize your experience, including recipe recommendations based on your preferences and available ingredients.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Communication:</Text> We may send you notifications, updates, or promotional emails related to our services.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Improvement:</Text> Your feedback and usage data help us improve our services and develop new features.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Legal Compliance:</Text> We may process your information to comply with legal obligations or respond to law enforcement requests.
      </Text>

      <Title style={styles.title}>Data Sharing</Title>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>With Other Users:</Text> our recipes, reviews, and ratings may be visible to other users of the platform.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Third-Party Service Providers:</Text> We may share your information with third-party service providers who assist us in operating our website and application.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.listItem}>Legal Requirements:</Text> We may disclose your information in response to a subpoena, court order, or other legal request.
      </Text>

      <Title style={styles.title}>Security Measures</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        We implement technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
      </Text>

      <Title style={styles.title}>Cookies and Tracking Technologies</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver targeted advertisements. You can manage your cookie preferences through your browser settings.
      </Text>

      <Title style={styles.title}>Third-Party Links</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        Our website and application may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.
      </Text>

      <Title style={styles.title}>Updates to This Policy</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        We may update this privacy policy from time to time. Any changes will be posted on this page, and we may notify you via email or through our website or application.
      </Text>

      <Title style={styles.title}>Contact Us</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        If you have any questions or concerns about this privacy policy or your personal information, please contact us at help@mop.com.
      </Text>

      <Title style={styles.title}>Effective Date</Title>
      <Text variant="bodyLarge" style={styles.paragraph}>
        This privacy policy was last updated on March 2024.
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
    marginBottom: 15,
  },
  headline:{
    fontSize: 32,
    color: colors.headline,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title:{
    color: colors.headline,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 15
  },
  paragraph:{
    fontSize: 16,
    color: colors.paragraph,
    marginBottom: 15,
    marginLeft: 25
  },
  listItem: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default PrivacyPolicy;
