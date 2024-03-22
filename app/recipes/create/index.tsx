import { Link } from "expo-router";
import axios from "axios";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform, Button } from "react-native";
import colors from "../../../theme/colors";
import TagInput from '../../../components/TagInput';
import { TextInput } from "react-native-paper";
import { Icon } from "react-native-elements";
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
}//still mising instructions 

//HELP :(())

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

function CreateRecipe(props: Recipe) {
    const { } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [serving, setServing] = useState('');
    const [equipments, setEquipments] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState({ item: '', qty: '', unit: '' });
    const [categories, setCategories] = useState<string[]>([]);
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [owner, setOwner] = useState(); //set to username or userID of current user
    //create error or prompt to login first before they can create a recipe

    const [savedEquipments, setSavedEquipments] = useState(['pan', 'oven', 'knife']);

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

    const handleAddEquipment = (newEquipment: string[]) => {
        // Add new equipment to the current state and global state
        setEquipments([...equipments, ...newEquipment]);
        //setGlobalEquipments([...GlobalEquipments, ...newEquipment]);
    };

    const handleAddCategory = (newCategories: string[]) => {
        // Add new categories to the current state and global state
        setCategories([...categories, ...newCategories]);
        //setGlobalCategories([...GlobalCategories, ...newCategories]);
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
                </View>


                {/* Step 1 */}
                {formStep === 1 && (
                    <View style={styles.column}>
                        <TextInput
                            style={styles.input}
                            label="Title"
                            placeholder="Recipe Title"
                            value={title}
                            onChangeText={setTitle}
                            numberOfLines={2}
                        />

                        <TextInput
                            label='Description'
                            style={styles.input}
                            placeholder="Recipe Description"
                            value={description}
                            onChangeText={setDescription}
                            numberOfLines={4}
                        //scrollEnabled = {false}
                        />



                        <View style={[styles.row]}>

                            <View style={styles.column}>
                                <TextInput
                                    label="Prep Time"
                                    style={styles.input}
                                    placeholder="Prep Time in minutes"
                                    value={prepTime}
                                    onChangeText={setPrepTime}
                                    keyboardType="numeric"

                                />
                            </View>

                            <View style={styles.column}>
                                <TextInput
                                    label="Cook Time"
                                    style={styles.input}
                                    placeholder="Cook Time in minutes"
                                    value={cookTime}
                                    onChangeText={setCookTime}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.column}>
                                <TextInput
                                    label="Serving"
                                    style={styles.input}
                                    placeholder="Serves how many person"
                                    value={serving}
                                    onChangeText={setServing}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                    </View>

                )}
                {/* Step 2 */}
                {formStep === 2 && (

                    < View style={[styles.column]}>
                        <TagInput
                            tags={equipments}
                            label='Equipments:'
                            placeholder="Add an equipment needed"
                            onUpdateTags={handleAddEquipment}
                        />

                        <TagInput
                            tags={categories}
                            label='Categories:'
                            placeholder="Add category tag"
                            onUpdateTags={handleAddCategory}

                        />
                    </View>
                )}
                {/* Step 3 */}
                {formStep === 3 && (
                    <View style={[styles.column]}>
                        <TextInput
                            label="Ingredients"
                            style={styles.input}
                            placeholder="Ingredients"
                            value=''
                            editable
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            label="Instructions"
                            style={styles.input}
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
                        <View style={styles.divider}></View>
                    </View>

                )}

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnStep}
                    onPress={onPrev}>
                    <Text style={styles.btnText}>
                        <Icon name='arrow-left-circle' type="material-community"/> Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStep}
                    onPress={onNext}>
                    <Text style={styles.btnText}> Next <Icon name='arrow-right-circle' type="material-community"/></Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}


export default CreateRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "web" ? 80 : 0,
        alignItems: "center",
        padding: 20,
        width: "100%",
        maxWidth: 900,
        marginHorizontal: "auto",
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
        //borderColor: "#D8DDDB",
        //backgroundColor: "#D8DDDB",

        borderColor: "#E6E0E9",
        backgroundColor: "#E6E0E9",
        borderRadius: 5,
        borderWidth: 1,
        //padding: 10,
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
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    tagInput: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 8,
        fontSize: 16,
    },
    tag: {
        backgroundColor: "#007bff",
        padding: 8,
        margin: 4,
        borderRadius: 8,
    },
    tagText: {
        color: "white",
        fontSize: 16,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
    inputLabel: {
        fontSize: 16,
        //marginBottom: 2,
        textAlign: "left",
    },
});
