import { Link } from "expo-router";
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';



function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    return (
        <View style={styles.container}>
            <View>
              <TouchableOpacity style={styles.img}>
                <Text>Image Here</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Welcome to MyOnlyPans</Text>
                <Text style={styles.subHeader}>Enter the following information to Sign in                                                                                       
                </Text>
            </View>
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
    img:{
      padding: 80,
      marginBottom: 20,
      backgroundColor: '#00473E',
      borderRadius: 20,
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
