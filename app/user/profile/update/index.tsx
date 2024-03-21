import { Link } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';



function UpdateProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');

    return (

        <View style={styles.container}>

            <Text style={styles.header}>Edit MyProfile</Text>

            <View style={styles.profilePicture}>
                <Image
                    source={require('../../../../assets/sample.png')}
                    style={styles.image}
                />
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Change Photo</Text>
            </TouchableOpacity>

            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Leviel Leviel"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Kulet"
                value={lastName}
                onChangeText={setLastName}
            />
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                placeholder="levielkulet"
                value={userName}
                onChangeText={setUserName}
            />
            <Text style={styles.label}>Bio:</Text>
            <TextInput
                style={styles.input}
                placeholder="lorem ipsum"
                value={bio}
                onChangeText={setBio}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={contactNumber}
              onChangeText={setContactNumber}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </View >
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

export default UpdateProfile;
