import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";

interface Props { }

interface Recipe {
    title: string;
    description: string;
    serving: number;
    equipments: string[];
    ingredients: { item: string, qty: number, unit: string };
    categories: string[];
    prepTime: number;
    cookTime: number;
    notes: string;
    owner: string;
} //still mising instructions 

//HELP :(())

function ViewRecipe(props: Props) {
    const { } = props;

    return (
        <View>
            <Text>This is the View Recipe Screen</Text>
            <Link href="/">
                <Text>Home</Text>
            </Link>
            <View style={styles.container}>
                <Text style={styles.header}>Recipe Name</Text>
                <Text style={styles.paragraph}>Easdjkahdjakdh</Text>

               <Text>Title: </Text>
               <Text>Description: </Text>
            </View>
        </View >
    );
}


export default ViewRecipe;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F7F5',
    },
    header: {
        fontWeight: "bold",
        color: '#00473E',
        fontSize: 16,
    },
    paragraph: {
        fontSize: 16,
    },
    button: {
        color: "#FAAE2B",
    },

});
