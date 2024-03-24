import { Link, router } from "expo-router";
import React, { useState } from 'react';
import UpdateProfile from "../update";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TagInputUser from "../../../../components/TagInputUser";


function ProfileView() {
    const [myEquipment, setMyEquipment] = useState<string[]>([]);
    const [myIngredients, setMyIngredients] = useState<string[]>([]);

    const handleAddMyIngredients = (newMyIngredients: string[]) => {
        // Add new equipment to the current state 
        setMyIngredients([...myIngredients, ...newMyIngredients]);
    };

    const handleAddMyEquipment = (newMyEquipment: string[]) => {
        // Add new equipment to the current state 
        setMyEquipment([...myEquipment, ...newMyEquipment]);

    };

    return (

        <View style={styles.container}>
            <View style={[styles.content]}>
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.header}>MyKitchen</Text>
                    </View>
                </View>
                <View>
                    <TagInputUser
                        tags={myEquipment}
                        label='Enter your available equipment:'
                        placeholder=''
                        onUpdateTags={handleAddMyEquipment}
                    />
                </View>
            </View>
            <View style={[styles.content]}>
                {/* <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.header}>MyPantry</Text>
                    </View>
                </View> */}
                <View>
                    <TagInputUser
                        tags={myIngredients}
                        label='Enter your available ingredients:'
                        placeholder=''
                        onUpdateTags={handleAddMyIngredients}
                    />
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    content: {
        maxWidth: 900,
        width: "100%",
        marginBottom: 25,
    },
    profilePicture: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        overflow: 'hidden',
    },
    headerContainer: {
        alignItems: "flex-start",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 14,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 2,
        textAlign: "left",
    },
    subHeader: {
        fontSize: 15,
        marginBottom: 15,
        marginTop: 10,
        textAlign: "left",
    },
    label: {
        marginBottom: 10,
        fontSize: 15,
        textAlign: 'left',
    },
    input: {
        height: 60,
        color: 'black',
        width: '100%',
        borderColor: '#E6E0E9',
        backgroundColor: '#E6E0E9',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,

    },
    btn: {
        textAlign: 'center',
        backgroundColor: '#FAAE2B',
        width: '100%',
        marginTop: 20,

        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        color: '#00332C',
        backgroundColor: '#FAAE2B',
        fontSize: 16,
    },
});

export default ProfileView;
