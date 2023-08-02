import { createSlice} from "@reduxjs/toolkit";


// let itemId = 0;

const listSlice = createSlice ({
    name: "list",
    initialState:{
        items : [],
    },
    reducers: {
        addItem(state, action) {
            const newItem = {
                id: state.items.length + 1, 
                text: action.payload,
               
            };
    
            state.items.push(newItem);
        },
        setItems(state, action) {
            state.items = action.payload;
          },
          editItems (state, action) {
            const { id, newName } = action.payload;
            const itemToEdit = state.items.find(item => item.id === id);
            if (itemToEdit) {
              itemToEdit.name = newName;
            }
          },
        
    
        removeItem(state, action){
            const itemIdToRemove = action.payload;
            state.items = state.items.filter((item) => item.id !== itemIdToRemove);
        },
    }
})

export const { addItem, removeItem, setItems,editItems} = listSlice.actions

export default listSlice.reducer