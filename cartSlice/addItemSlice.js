import { createSlice } from "@reduxjs/toolkit"

function findItemIndex(cartItems, productId) {
    return cartItems.findIndex((item) => item.id === productId);
}

const addItem = createSlice({
    name: 'addItem',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },

        addMultipleItem(state, action) {
            // console.log(action)
            const { productId, type } = action.payload; // Expecting productId and type (Increase/Decrease)
            const itemIndex = findItemIndex(state, productId);
            console.log(itemIndex)
            if (itemIndex !== -1) {
                if (type === 'Increase') {
                    state[itemIndex].quantity += 1; // Increase quantity
                } else if (type === 'Decrease') {
                    if (state[itemIndex].quantity > 1) {
                        state[itemIndex].quantity -= 1; // Decrease quantity
                    } else {
                        // Optionally remove item if quantity reaches 0
                        state.splice(itemIndex, 1); // Remove item if quantity is 0
                    }
                }
            }
        },

        addAllData(state, action) {
            return action.payload;  // Replace the entire state with the payload
        },

        removeProduct(state, action) {
            const itemIndex = findItemIndex(state, action.payload);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
            }
        }
    }
})

export const { addToCart, addMultipleItem, addDataFromDb, addAllData, removeProduct } = addItem.actions
export default addItem.reducer