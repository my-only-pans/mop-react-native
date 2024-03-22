import { Link, router } from "expo-router";
import React, { useState } from 'react';
import UpdateProfile from "../update";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';


function ProfileView() {
    const [MyEquipment, setMyEquipment] = useState('');

    return (

        <View style={styles.container}>

            <Text style={styles.header}>MyEquipment</Text>

            {/* <View style={styles.profilePicture}>
                <Image
                    source={require('../../../../assets/sample.png')}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.userFullName}>Leviel Kulet</Text>
                <Text style={styles.userName}>@levielkulet</Text>
            </View> */}

            <Text style={styles.label}>Enter equipment:</Text>
            <TextInput
                style={styles.input}
                value={MyEquipment}
                onChangeText={setMyEquipment}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
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
    profilePicture: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        overflow: 'hidden',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    userFullName: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userName: {
        fontSize: 15,
        // marginBottom: 15,
        // marginTop: 10,
        textAlign: 'center',
    },
    bio: {
        fontSize: 15,
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
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
    image: {
        alignItems: 'center',
        // marginTop: 10,
        width: 120,
        height: 120,
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
