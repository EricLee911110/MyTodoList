import {useNavigation} from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {auth} from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                console.log('changing site')
                navigation.replace("Home");
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () =>{
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email)
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () =>{
        auth
            .signInWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email)
            })
            .catch(error => alert(error.message))
    }
    
    return (
        <View
            style = {styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email" 
                    //value ={email}
                    onChangeText = {(text) => setEmail(text)}
                    style = {styles.input}
                />
                <TextInput 
                    placeholder="Passwoard"
                    //ervalue={password}
                    onChangeText = {(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    inputContainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'#0782F9',
        width:'100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems:'center',
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop: 5,
        borderColor:'#0782F9',
        borderWidth: 2
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize: 16
    },
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize: 16
    },
})
