import React from 'react';
import { View, StyleSheet } from 'react-native';
import textStyles from '../theme/text';
import colors from '../theme/colors';

import { Text } from 'react-native-paper';

const CreationAgreement = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyles.p]}>
        <Text variant="bodyLarge" style={styles.bold}>I agree:</Text> By submitting a recipe to My Only Pans (the "Company"), I (the "Creator") agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty-free, worldwide license to use, display, reproduce, modify, distribute, and publish the submitted recipe on the Company's website, social media platforms, promotional materials, and any other medium deemed appropriate by the Company. I acknowledge that I retain ownership of the submitted recipe and have the right to grant the license mentioned above. I also warrant that the submitted recipe is original, does not infringe upon any third-party rights, and is not subject to any existing agreements or obligations that would prevent its use by the Company. Furthermore, I understand that the Company may edit or modify the submitted recipe for clarity, consistency, or other purposes without seeking my approval. I agree to indemnify and hold harmless the Company from any claims, damages, or liabilities arising from using the submitted recipe. This agreement constitutes the entire understanding between the Creator and My Only Pans regarding the submitted recipe and supersedes any prior agreements or understandings, whether written or oral.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    color: colors.paragraph,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default CreationAgreement;
