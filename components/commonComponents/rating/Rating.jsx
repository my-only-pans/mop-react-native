import React from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-elements';

function rateRecipe() {
    
    const ratingStar = {
        imageSize: 50,
        ratingCount: 5,
        ratingColor: "black",
        ratingBackgroundColor: "transparent",
        startingValue: 0,
        readonly: false,
        fullIcon: { name: 'star', type: 'material', color: 'yellow' },
        emptyIcon: { name: 'star-border', type: 'material', color: 'gray' },
    };
      

  return (
    <View>
      <h3>Rating</h3>
      <Rating {...ratingStar} />
    </View>
  );
}

export default rateRecipe;
