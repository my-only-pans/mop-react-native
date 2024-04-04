import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import getErrorMessage from "../../../utils/getErrorMessage";
import getServerUrl from "../../../utils/getServerUrl";
import getAuthToken from "../../../utils/getAuthToken";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Snackbar } from "react-native-paper";

interface Props {
  averageRating: number;
  onRate: (newRating: number) => any;
}

function RatingRecipe(props: Props) {
  const { averageRating, onRate } = props;

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onRate(star)}>
            <Icon
              name={
                averageRating && averageRating >= star ? "star" : "star-border"
              }
              size={35}
              color={
                averageRating && averageRating >= star ? "#FAAE2B" : "#aaa"
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  stars: {
    flexDirection: "row",
  },
});

export default RatingRecipe;
