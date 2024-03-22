import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
//import sampleRecipe from "../app/test/SampleRecipe";

interface Props {}

interface Recipe {
    title: string;
    description: string;
    serving: number;
    equipments: string[];
    ingredients: { item: string; qty: number; unit: string };
    categories: string[];
    prepTime: number;
    cookTime: number;
    notes: string;
    owner: string;
}

const sampleRecipe: Recipe = {
    title: 'Ramen',
    description: "This is a ramen",
    serving: 2,
    equipments: ['pan', 'oven'],
    ingredients: { item: 'chicken', qty: 2, unit: 'pcs' },
    categories: ['noodles', 'Japanese'],
    prepTime: 10,
    cookTime: 10,
    notes: "this is a sample note",
    owner: "userName",
}

function ViewRecipe(props: Props) {
    const {} = props;

    const typedSampleRecipe = sampleRecipe as Recipe;

    return (
        <View>
            <Text>This is the View Recipe Screen</Text>
            <Link href="/">
                <Text>Home</Text>
            </Link>
            <View style={styles.container}>
                <Text style={styles.header}>Recipe Details</Text>
                <Text style={styles.text}>Title: {typedSampleRecipe.title}</Text>
                <Text style={styles.text}>Description: {typedSampleRecipe.description}</Text>
                <Text style={styles.text}>Serving: {typedSampleRecipe.serving}</Text>
                <Text style={styles.text}>Equipments:</Text>
                <View style={styles.tagContainer}>
                    {Array.isArray(typedSampleRecipe.equipments) && typedSampleRecipe.equipments.map((equipment, index) => (
                        <View 
                            key={index}
                            style={styles.tagWrapper}>
                            <Text style={styles.tagText}>
                                {equipment}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.text}>Ingredients:</Text>
                <Text style={styles.text}>
                    {typedSampleRecipe.ingredients.qty} {typedSampleRecipe.ingredients.unit} of {typedSampleRecipe.ingredients.item}
                </Text>
                <Text style={styles.text}>Categories:</Text>
                <View style={styles.tagContainer}>
                    {Array.isArray(typedSampleRecipe.categories) && typedSampleRecipe.categories.map((category, index) => (
                        <View 
                            key={index}
                            style={styles.tagWrapper}>
                            <Text style={styles.tagText}>
                                {category}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.text}>Prep Time: {typedSampleRecipe.prepTime} minutes</Text>
                <Text style={styles.text}>Cook Time: {typedSampleRecipe.cookTime} minutes</Text>
                <Text style={styles.text}>Notes: {typedSampleRecipe.notes}</Text>
                <Text style={styles.text}>Owner: {typedSampleRecipe.owner}</Text>
            </View>
        </View>
    );
}

export default ViewRecipe;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F7F5',
        padding: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    header: {
        fontWeight: "bold",
        color: '#00473E',
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tagWrapper: {
        backgroundColor: '#C1E7E3',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    tagText: {
        fontSize: 14,
        color: '#00473E',
    },
});
