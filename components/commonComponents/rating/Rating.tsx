import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import getErrorMessage from '../../../utils/getErrorMessage';
import getServerUrl from "../../../utils/getServerUrl";
import getAuthToken from "../../../utils/getAuthToken";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Snackbar } from "react-native-paper";

interface Props {
  recipeId: string;
  rating: { avg: number; ratingNum: number; } | undefined;
  onReFetch: () => any;
}

function RatingRecipe (props: Props){
  const { recipeId, rating, onReFetch} = props;
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>();

  const [starRating, setStarRating] = useState<number>(0);
  //const  localRating; 

  //handle rating selection
  const handleRating = async (star: number) => {
    setStarRating(star);
    console.log('clicked rating: ' , star);

    const body = { recipeId, rating: star };
    
    console.log('body: ' , body);
    axios
      .post(getServerUrl() + "/rate", 
      body, 
      {headers: { Authorization: await getAuthToken() }
      })
      .then((res) => {
        // TODO display success
        onReFetch();
        setServerMessage("Recipe successfuly rated");
      })
      .catch((error) => console.log(getErrorMessage(error)));
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
