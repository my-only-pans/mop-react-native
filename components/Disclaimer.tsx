import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from 'react-native-paper';

const Disclaimer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text variant="bodyLarge" style={styles.bold}>Disclaimer:</Text> The following disclaimer applies to all recipes, content, and information provided on this platform: Our recipes may contain allergens, and it is the user's responsibility to be aware of and avoid any ingredients they are allergic to. The nutritional information provided is an estimate and should not be considered a substitute for professional dietary advice. While we may suggest ingredient substitutions, we cannot guarantee the same taste or outcome. We emphasize the importance of safe food handling practices, and users should follow recommended guidelines to prevent foodborne illness. Users are encouraged to consider their individual needs, preferences, and dietary restrictions when preparing and consuming recipes. While we strive for accurate and reliable recipes, we cannot guarantee the same results for every user due to variations in ingredients, equipment, and cooking techniques. Exercise caution, especially with complex recipes, and users should use their discretion and judgment when attempting new recipes. We accept no liability for any issues arising from using our recipes, and by accessing and using our content, users agree to use it at their own risk. We welcome feedback and questions to improve our recipes and content, and all recipes and content are protected by copyright law and belong to their respective owners, with any unauthorized use or reproduction prohibited.
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
    fontSize: 16,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Disclaimer;
