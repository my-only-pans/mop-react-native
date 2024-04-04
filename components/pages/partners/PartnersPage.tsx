import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import colors from '../../../theme/colors';
import PartnerDisplay from './PartnerDisplay';
import textStyles from '../../../theme/text';

const PartnershipPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
      <Text variant="displayLarge" style={[styles.headline,textStyles.h1]}>Partnership and Partners</Text>

      <Text style={[styles.paragraph, textStyles.p]}>
        Welcome to My Only Pans, where culinary enthusiasts and leading brands come together to revolutionize the way we cook and connect! Our platform offers a vibrant community where users can explore, share, and create delicious recipes while partnering with trusted brands to elevate their culinary experience.
      </Text>
      
      <View style={styles.partnerDisplayContainer}>
        <PartnerDisplay/>
      </View>

      <Title style={[styles.title, textStyles.h3]}>Benefits of Partnership</Title>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Access a Diverse Audience:</Text> Connect with a vast community of food lovers and home cooks eager to discover new products and ingredients.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Amplify Your Brand Presence:</Text> Showcase your products to a highly engaged audience and strengthen brand awareness through targeted promotions and collaborations.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Drive Sales and Engagement:</Text> Leverage our platform to launch exclusive offers, promotions, and sponsored content that drive traffic and conversions.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Foster Authentic Connections:</Text> Build meaningful relationships with consumers by integrating your brand seamlessly into their cooking journey and providing valuable resources and inspiration.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Types of Partnerships</Title>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>1.</Text> Product Placement and Integration
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>2.</Text> Sponsored Content and Featured Recipes
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>3.</Text> Co-Branded Campaigns and Promotions
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>4.</Text> Exclusive Offers and Discounts
      </Text>

      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>5.</Text> Brand Ambassador and Influencer Collaborations
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Partner Requirements</Title>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>-</Text> Relevance to the culinary and home cooking industry
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>-</Text> Alignment with My Only Pans' values of authenticity and quality
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>-</Text> Commitment to providing value and enhancing the user experience
      </Text>

      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>-</Text> Willingness to collaborate and innovate in partnership initiatives
      </Text>


      <Title style={[styles.title, textStyles.h3]}>How to Become a Partner</Title>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>1.</Text> Reach out to our partnership team at partnerships@myonlypans.com to discuss potential collaboration opportunities.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>2.</Text> Our team will work with you to identify the best partnership model and tailor a strategy to meet your objectives.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>3.</Text> Once agreed upon, we'll guide you through the onboarding process and provide ongoing support to ensure a successful partnership.
      </Text>


      <Title style={[styles.title, textStyles.h3]}>FAQs</Title>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Q:</Text> How can my brand benefit from partnering with My Only Pans?
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>A:</Text> Partnering with us offers a unique opportunity to reach a highly engaged audience of food enthusiasts, drive sales, and enhance brand visibility through targeted promotions and collaborations.
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>Q:</Text> What types of brands do you partner with?
      </Text>
      <Text style={[styles.paragraph, textStyles.p]}>
        <Text style={styles.listItem}>A:</Text> We welcome partnerships with brands across the culinary and home cooking industry, including retailers, food manufacturers, kitchen appliance companies, and more.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Contact Us</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        For partnership inquiries, please contact our team at partnerships@myonlypans.com.
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
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title:{
    marginBottom: 15,
    marginLeft: 15,
    color: colors.primary
  },
  paragraph:{
    marginBottom: 15,
    marginLeft: 25,
    color: colors.paragraph
  },
  listItem: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  partnerDisplayContainer: {
    padding: 0,
    marginBottom: 5,
  },
});

export default PartnershipPage;
