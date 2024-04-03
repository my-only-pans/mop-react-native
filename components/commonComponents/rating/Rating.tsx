import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


interface RateRecipeProps {
  recipeId: string,
  rating: number,
}

const RatingRecipe: React.FC<RateRecipeProps> = ({ recipeId }) => {
  const [starRating, setStarRating] = useState<number>(0);

  //handle rating selection
  const handleRating = (star: number) => {
    setStarRating(star);
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name={starRating && starRating >= star ? 'star' : 'star-border'}
              size={35}
              color={starRating && starRating >= star ? '#FAAE2B' : '#aaa'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  stars: {
    flexDirection: 'row', 
  },
});

export default RatingRecipe;
