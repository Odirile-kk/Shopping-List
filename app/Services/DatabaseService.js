import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydblist.db");

// open database file
 const createDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS list (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);",
        [],
        () => {
          console.log("Table created or already exists");
        },
        (error) => {
          console.error("Error creating table: ", error);
        }
      );
    });
  };

  const saveToDatabase = (text) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO list (text) VALUES (?);",
          [text],
          (_, result) => {
            console.log("Item added successfully.");
            resolve(result);
          },
          (_, error) => {
            console.error("Error adding item:", error);
            reject(error);
          }
        );
      });
    });
  };

const fetchFromDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM list;",
          [],
          (_, result) => {
            const items = result.rows._array;
            resolve(items);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  const editInDatabase = (itemId, newText) => {
    return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Execute the SQL query to update the item
      tx.executeSql(
        "UPDATE list SET text = ? WHERE id = ?;",
        [newText, itemId],
        (_, resultSet) => {
          // Check if any rows were affected by the update query
          if (resultSet.rowsAffected > 0) {
            // Return the updated item as an object
            const updatedItem = { id: itemId, text: newText };
            resolve(updatedItem);
          } else {
            // If no rows were affected, the item with the given itemId was not found
            reject(new Error("Item not found in the database.", resultSet));
          }
        },
        (_, error) => {
          // Handle any errors that occur during the update query
          reject(new Error("Error updating item in the database: " + error.message));
        }
      );
    });
  });
  };
  

const deleteItemFromDatabase = (itemId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM list WHERE id = ?;",[itemId],
        (_, result) => {
          console.log("Item deleted successfully from the database.", result);
          resolve(result);
        },
        (_, error) => {
          console.error("Error deleting item from database:", error);
          reject(error);
        }
      );
    });
  });
};
export { createDatabase, saveToDatabase, fetchFromDatabase, deleteItemFromDatabase, editInDatabase}