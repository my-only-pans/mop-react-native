import { Link } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';



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
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Create an account</Text>
                <Text style={styles.subHeader}>Enter the following information to create an account</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstname}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastname}
                onChangeText={setLastname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactnumber}
                onChangeText={setContactNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
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
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmpassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Sign - up</Text>
            </TouchableOpacity>
            <Text style={styles.subHeader}>Already have an account?<Link href="/"> Sign in</Link></Text>
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
    headerContainer: {
      alignItems: 'flex-start',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'left',
    },
    subHeader: {
      fontSize: 15,
      marginBottom: 15,
      marginTop: 10,
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
