import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/text';

const Terms_AND_Privacy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
      <Text variant="displayLarge" style={[styles.headline,textStyles.h1]}>Terms & Privacy</Text>

      <Title style={[styles.title, textStyles.h3]}>Purpose</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        This legal notice is provided to establish the terms of use and limitations of liability governing the use of this website.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Scope</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        This legal notice applies to all users accessing or using this website and its content.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>User Conduct</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Users are expected to conduct themselves in a respectful manner while using this website. Prohibited activities include harassment, defamation, infringement of intellectual property rights, and any illegal or unauthorized use of the website.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Disclaimer of Liability</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is, therefore, strictly at your own risk. In no event will we be liable for any loss or damage, including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Terms of Use</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        By accessing or using this website, you agree to abide by these terms of use. You may search, view, post, share, review, and rate recipes contributed by users and authors alike. You may not use this website in any unlawful or prohibited manner, including but not limited to transmitting any unlawful, threatening, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material, or any material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any law.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Jurisdiction and Governing Law</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        Any legal disputes arising out of or related to the use of this website shall be governed by the laws of Ontario, Canada, and the courts of Ontario shall have exclusive jurisdiction over any such disputes.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Severability Clause</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        If any provision of this legal notice is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render this legal notice unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Contact Information</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        For inquiries or concerns regarding this legal notice, please contact us at [Contact Information].
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Effective Date</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        This privacy policy was last updated on March 2024.
      </Text>

      <Title style={[styles.title, textStyles.h3]}>Updates</Title>
      <Text variant="bodyLarge" style={[styles.paragraph, textStyles.p]}>
        We reserve the right to update or modify this legal notice at any time without prior notice. Any changes will be effective immediately upon posting on this website.
      </Text>

      <Title style={[styles.mop, textStyles.p]}>My Only Pans</Title>
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
    marginBottom: 15,
    marginLeft: 15,
    fontFamily: 'Poppins-Bold',
  },
  paragraph:{
    color: colors.paragraph,
    marginBottom: 15,
    marginLeft: 25
  },
  mop:{
    color: colors.secondary,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 15
  },

});

export default Terms_AND_Privacy;
