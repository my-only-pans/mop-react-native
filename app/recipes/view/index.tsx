import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Platform, TouchableOpacity, Image, } from "react-native";
import { Button } from "react-native-paper";
//import sampleRecipe from "../app/test/SampleRecipe";
import { Icon } from 'react-native-elements'
import colors from "../../../theme/colors";
//import from '../../../assets/recipe';

interface Props { }

interface Recipe {
    title: string;
    description: string;
    serving: number;
    equipments: string[];
    ingredients: { item: string; qty: number; unit: string }[];
    categories: string[];
    prepTime: number;
    cookTime: number;
    owner: string;
}

const sampleRecipe: Recipe = {
    title: 'Shoyu Ramen',
    description: "This is the ramen egg that we all know and enjoy. This can also be a snack.",
    serving: 2,
    equipments: ['small pot', 'measuring spoon', 'knife', 'cutting board'],
    ingredients: [{ item: 'large egg', qty: 4, unit: 'pcs' },
    { item: 'soy sauce', qty: 1, unit: 'tablespoon' },
    { item: 'flour', qty: 0.25, unit: 'cup' },
    ],
    categories: ['Snack', 'Japanese', 'Quick and Easy', 'Breakfast', 'Side Dish'],
    prepTime: 2,
    cookTime: 6,
    owner: "levielKulet24",
}

function ViewRecipe(props: Props) {
    const { } = props;

    const localRecipe = sampleRecipe as Recipe;

    const [typedSampleRecipe, setTypedSampleRecipe] = useState(localRecipe);

    const [thisServing, setThisServing] = useState(typedSampleRecipe.serving);

    // Function to decrease serving count
    const decreaseServing = () => {
        const newServing = thisServing - 1;
        if (newServing >= 1) {
            const servingRatio = newServing / typedSampleRecipe.serving;

            const updatedIngredients = typedSampleRecipe.ingredients.map(ingredient => ({
                ...ingredient,
                qty: ingredient.qty * servingRatio
            }));

            console.log(newServing);
            setThisServing(newServing);
            setTypedSampleRecipe({
                ...typedSampleRecipe,
                serving: newServing,
                ingredients: updatedIngredients
            });
        }
    };
    // Function to increase serving count
    const increaseServing = () => {
        const newServing = thisServing + 1;
        const servingRatio = newServing / typedSampleRecipe.serving;

        const updatedIngredients = typedSampleRecipe.ingredients.map(ingredient => ({
            ...ingredient,
            qty: ingredient.qty * servingRatio
        }));

        
        console.log(newServing);
        setThisServing(newServing);
        setTypedSampleRecipe({
            ...typedSampleRecipe,
            serving: newServing,
            ingredients: updatedIngredients
        });
    };


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>{typedSampleRecipe.title}</Text>
                    <View style={[styles.row]}>
                        <Icon name="star" color={colors.highlight} type="material" />
                        <Icon name="star" color={colors.highlight} type="material" />
                        <Icon name="star" color={colors.highlight} type="material" />
                        <Icon name="star" color={colors.highlight} type="material" />
                        <Icon name="star" color={colors.highlight} type="material" />
                    </View>

                    <View style={[styles.row, { marginVertical: 6 }]}>
                        <Text style={styles.submittedBy}>Submitted by: </Text>
                        <Link href={'./'} style={styles.userName}>{typedSampleRecipe.owner}</Link>
                    </View>

                    <Text style={[styles.description]}>{typedSampleRecipe.description}</Text>
                </View>

                <View style={[styles.row, styles.imgContainer]}>
                    <Pressable onPress={() => { }}>
                        <Image
                            style={styles.img}
                            source={require('../../../assets/recipes/Ramen-Eggs-1.jpg')}
                            resizeMode="cover"
                            resizeMethod="resize" />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image
                            style={styles.img}
                            source={require('../../../assets/recipes/Ramen-Eggs-19.jpg')}
                            resizeMode="cover"
                            resizeMethod="resize" />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image
                            style={styles.img}
                            source={require('../../../assets/recipes/Ramen-Eggs-24.jpg')}
                            resizeMode="cover"
                            resizeMethod="resize" />
                    </Pressable>
                </View>

                <View style={[styles.row, styles.timeContainer]}>
                    <View style={styles.column}>
                        <View style={[styles.row]}>
                            <Text style={styles.label}>Prep Time: </Text>
                            <Text style={styles.text}>{typedSampleRecipe.prepTime} minutes</Text>
                        </View>

                        <View style={[styles.row]}>
                            <Text style={styles.label}>Cook Time: </Text>
                            <Text style={styles.text}>{typedSampleRecipe.cookTime} minutes</Text>
                        </View>
                    </View>
                    <View style={[styles.column]} >
                        <View style={[styles.row]}>
                            <Text style={styles.label}>Serving: </Text>
                            <Text style={styles.text}>{thisServing}</Text>

                            <TouchableOpacity
                                onPress={decreaseServing}>
                                <Icon
                                    name='minus-circle'
                                    type="material-community"
                                    color={colors.button}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={increaseServing}>
                                <Icon
                                    name='plus-circle'
                                    type="material-community"
                                    color={colors.button}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View style={[styles.column]}>
                    <View style={[styles.column, { justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={styles.label}>Categories:</Text>
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
                        </View>

                        <View>
                            <Text style={styles.label}>Equipments:</Text>
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
                        </View>
                    </View>

                    <View style={[styles.column]}>

                        <View>
                            <Text style={styles.label}>Ingredients:</Text>
                            {typedSampleRecipe.ingredients.map((ingredient, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.text}>
                                        {ingredient.qty} {ingredient.unit} of {ingredient.item}
                                    </Text>
                                    {index !== typedSampleRecipe.ingredients.length - 1 && (
                                        <View style={{ width: 100 }} />
                                    )}
                                </View>
                            ))}
                        </View>

                        <View>
                            <Text style={styles.label}>Instructions: </Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}

export default ViewRecipe;

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "web" ? 80 : 0,
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginHorizontal: "auto",
    },
    content: {
        maxWidth: 900,
        width: '100%',
    },
    headerContainer: {
        alignItems: "flex-start",
        marginBottom: 6,
    },
    header: {
        fontWeight: "bold",
        color: '#00473E',
        fontSize: 20,
        marginBottom: 6,
        textAlign: "left",
    },
    text: {
        fontSize: 16,
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
    row: {
        flexDirection: Platform.OS !== "web" ? "column" : "row",
        gap: 20,
    },
    column: {
        flexGrow: 1,
        flexShrink: 0,
        gap: 20,
    },
    subHeader: {
        fontSize: 15,
        marginBottom: 15,
        marginTop: 10,
        textAlign: "left",
    },
    recipeTitle: {

    },
    submittedBy: {

    },
    userName: {
        color: colors.button,
    },
    description: {
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 4,
    },
    img: {
        // maxWidth: 300,
        //maxHeight:300,
        width: 300,
        height: 300,
        borderRadius: 6,
    },
    imgContainer: {
        gap: 6,
        marginVertical: 14,
    },
    timeContainer: {
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        textAlign: "left",
        fontWeight: 'bold',
        color: '#00473E',
    },
});
