import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Modal,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, setItems, editItems } from "../Redux/listSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  deleteItemFromDatabase,
  fetchFromDatabase,
  editInDatabase,
} from "../Services/DatabaseService";



const ListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newText, setNewText] = useState();

  useEffect(() => {
    fetchItemsFromDatabase();
  }, [dispatch]);

  const fetchItemsFromDatabase = async () => {
    try {
      const itemsDB = await fetchFromDatabase();
      dispatch(setItems(itemsDB));
    } catch (err) {
      console.log("Error fetching from the database", err);
    }
  };

  //when the list is empty
  if (!items.length) {
    return (
      <View style={{ textAlign: "center" }}>
        {/* <Text >Start adding items to your list</Text> */}
        <Image
          source={require("../assets/4025692.jpg")}
          style={{
            width: "90%",
            height: "80%",
            alignSelf: "center",
            marginTop: "20%",
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
            borderTopLeftRadius: 80,
          }}
        />
      </View>
    );
  }

  const handleDelete = async (itemId) => {
    try {
      // Remove the item from the Redux state.
      dispatch(removeItem(itemId));
      // Delete the item from the database.
      await deleteItemFromDatabase(itemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const handleSave = async (itemId) => {
      
    try {
      console.log(" Start");
    

      const updatedItem = await editInDatabase(itemId, newText);
      console.log(" updated in database", updatedItem);
      console.log(" dispatching editItems action");
      dispatch(editItems({ id: itemId, text: newText }));
      console.log(" newText:", newText);
    
      setModalVisible(false);
      console.log("End");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
   
  const renderList = ({ item, index }) => (
    <View style={styles.list}>
      <Text style={styles.listItem}>{`${index + 1}. ${item.text}`}</Text>
      <View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={24} color="#FF0066" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setEditingItemId(item.id);
            setModalVisible(true); // Show the modal when edit icon is pressed
          }}
        >
          <Icon name="edit" size={24} color="#FF0066" />
        </TouchableOpacity>
      </View>
    </View>
  );
 
  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderList}
        keyExtractor={(item) => item.id.toString()}
      />
      {editingItemId !== null && (
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.box}>
              <Text style={{ padding: 30, textAlign: "center", fontSize: 24 }}>
                Update your list
              </Text>
              <TextInput
                value={newText}
                onChangeText={setNewText}
                style={styles.modalInput}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => handleSave(editingItemId)}>
                  <Icon name="check-circle" size={30} color="#FF0066" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onCancel}>
                  <Icon name="cancel" size={30} color="#FF0066" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  list: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    borderColor: "pink",
    borderWidth: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    maxHeight: "80%",
  },
  modalInput: {
    borderWidth: 2,
    borderColor: "pink",
    padding: 18,
    marginBottom: 16,
    width: "100%",
    borderRadius: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
