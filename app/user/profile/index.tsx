import { Link } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';



function Registration() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [contactnumber, setContactNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    return (
        
        <View style={styles.container}>

            <Text style={styles.header}>MyProfile</Text>

            <Image
                source={require('../../../assets/img-placeholder.png')}
                style={styles.image}
            />
            <View>
                <Text style={styles.userFullName}>Leviel Kulet</Text>
                <Text style={styles.userName}>@levielkulet</Text>
                <Text style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida,
                    mauris ac sodales semper, neque velit mollis velit, eget cursus lectus quam sit amet lacus.</Text>
            </View>

            <View>
                <Text style={styles.header}>MyPreferences</Text>
            </View>
            <Text style={styles.label}>Dietary Preference:</Text>
            <TextInput
                style={styles.input}
                placeholder="Vegan"
                value={email}
                onChangeText={setEmail}
                editable={false}
            />
            <Text style={styles.label}>Cuisine:</Text>
            <TextInput
                style={styles.input}
                placeholder="Filipino"
                value={email}
                onChangeText={setEmail}
                editable={false}
            />
            <Text style={styles.label}>Prep & Cook Time:</Text>
            <TextInput
                style={styles.input}
                placeholder="1 hour"
                value={email}
                onChangeText={setEmail}
                editable={false}
            />
            <Text style={styles.label}>Serves:</Text>
            <TextInput
                style={styles.input}
                placeholder="2"
                value={email}
                onChangeText={setEmail}
                editable={false}
            />

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Edit Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Edit Profile</Text>
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
    // container2: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    //     padding: 20,
    // },
    // headerContainer: {
    //     // alignItems: 'flex-start',
    // },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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
        marginTop: 20,
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

export default Registration;
