import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

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

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EADE',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },

  items:{
    marginTop: 30,

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
    
});
