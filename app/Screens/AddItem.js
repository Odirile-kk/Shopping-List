import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/listSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import { createDatabase, saveToDatabase } from '../Services/DatabaseService';

const AddItem = () => {
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    createDatabase(); 
  }, []);

  function handleSubmit() {
    if (text) {
      dispatch(addItem(text));
    
      saveToDatabase(text)
      .then(() => {
        setText("");
      })
     .catch((error) => {
      console.log("Error saving data: ", error);
     })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add Item"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Icon name="add" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};



export default AddItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: "white",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#FF0066",
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: "#FF0066",
    elevation: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
