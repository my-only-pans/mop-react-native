import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";

interface Props { }

function UpdateRecipe(props: Props) {
    const { } = props;

    //const [text, setText] = React.useState("");

    return (
        <View>
            <Text>This is the UpdateRecipe Screen</Text>
            <Link href="/">
                <Text>Home</Text>
            </Link>
            <View style={styles.container}>
                <Text style={styles.header}>Update Recipe</Text>
                <Text style={styles.paragraph}>Enter the following information to update your recipe.</Text>

                <TextInput
                    placeholder="Recipe Title"
                    value=""
                />
                <TextInput
                    placeholder="Recipe Description"
                    value=""
                    editable
                    multiline
                    numberOfLines={2}
                />
                <TextInput
                placeholder="Ingredients"
                value=""
                editable
                multiline
                numberOfLines={4}
            />
            <TextInput
                    placeholder="Equipments Needed"
                    value=""
                    editable
                    multiline
                    numberOfLines={2}
                />
                <TextInput
                    placeholder="Instructions"
                    value=""
                    editable
                    multiline
                    numberOfLines={2}
                />
                <TextInput
                    placeholder="Prep Time"
                    value=""
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Cook Time"
                    value=""
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Serving"
                    value=""
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Notes"
                    value=""
                    editable
                    multiline
                    numberOfLines={2}
                />
                <TextInput
                    placeholder="Categories"
                    value=""
                    editable
                    multiline
                    numberOfLines={2}
                />

                <Button>Save Recipe</Button>
            </View>
        </View >
    );
}


export default UpdateRecipe;

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
