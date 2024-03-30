import React from 'react';
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Text, Title } from 'react-native-paper';
import colors from '../../../theme/colors';

const PartnerDisplay = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const imageHeight = screenWidth * 0.3;
  const containerWidth = screenWidth * 0.9;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Title style={styles.title}>Our Partners</Title>
      <View style={styles.swiperContainer}>
        <Swiper
            autoplay
            autoplayTimeout={4} 
            style={styles.wrapper}
        >
            <View style={styles.slide}>
            <Image
                source={require('../../../assets/partners/walmart.jpg')} 
                style={[styles.partnerImage, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.partnerName}>Walmart</Text>
            </View>

            <View style={styles.slide}>
            <Image
                source={require('../../../assets/partners/instacart.png')}
                style={[styles.partnerImage, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.partnerName}>Instacart</Text>
            </View>

            <View style={styles.slide}>
            <Image
                source={require('../../../assets/partners/sunflower.png')} 
                style={[styles.partnerImage, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.partnerName}>The Sunflower Farm</Text>
            </View>

            <View style={styles.slide}>
            <Image
                source={require('../../../assets/partners/metro.png')} 
                style={[styles.partnerImage, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.partnerName}>Metro</Text>
            </View>

            <View style={styles.slide}>
            <Image
                source={require('../../../assets/partners/covent_garden.png')} 
                style={[styles.partnerImage, { height: imageHeight }]}
                resizeMode="contain"
            />
            <Text style={styles.partnerName}>Covent Garden Market</Text>
            </View>
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
},
swiperContainer: {
    height: 900,
},
  wrapper: {
    marginTop: -35,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
},
  partnerImage: {
    width: '50%',
    marginBottom: 5,
    marginTop: 0,
    padding: 0
},
  partnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.highlight,
},
  title: {
    fontWeight: 'bold',
    color: colors.headline,
    marginBottom: 15,
    marginLeft: 15,
},
});

export default PartnerDisplay;
