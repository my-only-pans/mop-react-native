import { Link } from "expo-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";


function ViewMyRecipes(){


    return (
        <View>
            <Text>This is MyRecipes Screen</Text>

            <View style={styles.myrecipes}>
            <Text>Your Recipes</Text>
            </View>

            <View style={styles.savedrecipes}>
            <Text>Saved Recipes</Text>
            </View>
        </View>
    );
}

export default ViewMyRecipes;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F7F5',
    },
    myrecipes: {
        backgroundColor: 'red',
    },
    savedrecipes: {
        backgroundColor: 'yellow',
    },
});