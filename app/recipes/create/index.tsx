import { Link } from "expo-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform, Button } from "react-native";
import { TextInput } from "react-native-paper";
//import MultiSteps from "react-native-multi-steps";

interface Props { }

interface RecipeInput {
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

const sampleRecipe = {
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

function CreateRecipe(props: Props) {
    const { } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [serving, setServing] = useState('');
    const [equipments, setEquipments] = useState([]);
    const [ingredients, setIngredients] = useState({ item: '', qty: '', unit: '' });
    const [categories, setCategories] = useState([]);
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [notes, setNotes] = useState('');
    const [owner, setOwner] = useState(); //set to username or userID of current user
    //create error or prompt to login first before they can create a recipe

    const [formStep, setFormStep] = useState(1);

    const onNext = () => {
        if (formStep < 3) {
            setFormStep(prevStep => prevStep + 1);
        }
    };

    const onPrev = () => {
        if (formStep > 1) {
            setFormStep(prevStep => prevStep - 1);
        }
    };


    return (
        <View style={styles.container}>
            <View style={[styles.content]}>

                <View style={styles.headerContainer}>
                    <View style={styles.headerText}>
                        <Text style={styles.header}>Create a New Recipe</Text>
                        <Text style={styles.subHeader}>
                            Enter the following information to upload your own recipe.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnStep}
                            onPress={onPrev}>
                            <Text style={styles.btnText}>Previous Step</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStep}
                            onPress={onNext}>
                            <Text style={styles.btnText}>Next Step</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.row}>
                    {/* Step 1 */}
                    {formStep === 1 && (
                        <View style={[styles.column]}>
                            <TextInput
                                // style={styles.input}
                                multiline
                                label="Title"
                                placeholder="Recipe Title"
                                value={title}
                                onChangeText={setTitle}
                                numberOfLines={2}
                            //dense      
                            />
                            <TextInput
                                label='Description'
                                placeholder="Recipe Description"
                                value={description}
                                onChangeText={setDescription}
                                editable
                                multiline
                                numberOfLines={2}
                            //scrollEnabled = {false}
                            />
                            <TextInput
                                label="Prep Time"
                                placeholder="Prep Time in minutes"
                                value={prepTime}
                                onChangeText={setPrepTime}
                                keyboardType="numeric"

                            />
                            <TextInput
                                label="Cook Time"
                                // style={styles.input}
                                placeholder="Cook Time"
                                value={cookTime}
                                onChangeText={setCookTime}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Serving"
                                //style={styles.input}
                                placeholder="Serving"
                                value={serving}
                                onChangeText={setServing}
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Ingredients"
                                //style={styles.input}
                                placeholder="Ingredients"
                                value=''
                                editable
                                multiline
                                numberOfLines={4}
                            />
                        </View>
                    )}
                    {/* Step 2 */}
                    {formStep === 2 && (

                        < View style={[styles.column]}>

                            <TextInput
                                label="Equipments"
                                //style={styles.input}
                                placeholder="Equipments Needed"
                                value=''
                                editable
                                multiline
                                numberOfLines={2}
                            />

                            <TextInput
                                label="Notes"
                                //style={styles.input}
                                placeholder="Notes"
                                value={notes}
                                onChangeText={setNotes}
                                editable
                                multiline
                                numberOfLines={2}
                            />
                            <TextInput
                                label="Categories"
                                //style={styles.input}
                                placeholder="Categories"
                                value=""
                                editable
                                multiline
                                numberOfLines={2}
                            />
                        </View>
                    )}
                    {/* Step 3 */}
                    {formStep === 3 && (
                        <View style={[styles.column]}>
                            <TextInput
                                label="Instructions"
                                //style={styles.input}
                                placeholder="Instructions"
                                value=''
                                editable
                                multiline
                                numberOfLines={2}
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btnText}>Preview Recipe</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btnText}>Save Recipe</Text>
                                </TouchableOpacity>
                                <Text style={styles.subHeader}>or<Link href="/"> Cancel</Link></Text>
                            </View>
                        </View>
                    )}

                </View>


            </View>

        </View >
    );
}


export default CreateRecipe;

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "web" ? 80 : 0,
        alignItems: "center",
        padding: 20,
    },
    content: {
        maxWidth: 900,
        width: "100%",
    },
    headerContainer: {
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 14,
    },
    headerText: {

    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 2,
        textAlign: "left",
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
    input: {
        height: 60,
        width: "100%",
        borderColor: "#D8DDDB",
        backgroundColor: "#D8DDDB",
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        flex: 1,
        marginHorizontal: 5,
        textAlign: "center",
        backgroundColor: "#FAAE2B",
        width: "100%",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    btnText: {
        textAlign: "center",
        color: "#00332C",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnStep: {
        flex: 1,
        marginHorizontal: 5,
        textAlign: "center",
        backgroundColor: "#FAAE2B",
        width: "100%",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});