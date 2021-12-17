import { useNavigation } from '@react-navigation/core'
import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView,  } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native'
import { auth } from '../firebase'
import Task from '../components/Task'

const HomeScreen = () => {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const navigation = useNavigation()

    const handleSignOut = () =>{
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const handleAddTask = () => {
        setTaskItems([...taskItems, task]);
        setTask(null);
    }

    const completeTask = (index) => {
        let itemscopy = [...taskItems];
        itemscopy.splice(index, 1);
        setTaskItems(itemscopy);
    }

    return (
        <View style={styles.container}>
            <View style={styles.signOutView}>
                <Text>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress= {handleSignOut} 
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
                style = {styles.scrollView}
            >

            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's tasks</Text>
                
                <View>
                    <View style={styles.items}>
                     {
                        taskItems.map((item, index) =>{
                            return (
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                             <Task text={item}></Task>
                            </TouchableOpacity>
                            )
                        }) 
                    }
                    </View>
                </View>
            </View>
        
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style = {styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={"Write a Task"}  value ={task} onChangeText={(text) => setTask(text)}/>

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    signOutView:{
        alignItems:'flex-end',
        paddingTop: 22,
        paddingRight: 10
    },
    button:{
        backgroundColor: '#0782F9',
        width:'20%',
        padding:5,
        borderRadius: 10,
        alignItems:'center',
        marginTop: 3,
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize: 13,
    },

    scrollView:{
        marginTop:10,
    },

    tasksWrapper:{
        paddingHorizontal: 20,
    },

    sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    },

    items:{
    marginTop: 20,
    },

    writeTaskWrapper:{
    position: 'absolute',
    bottom: 60, 
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
    },

    input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 60,
    width: 250,
    },

    addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0'
    },

    addText:{},
    
})
