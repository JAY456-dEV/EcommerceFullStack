const { createSlice } = require("@reduxjs/toolkit");

function findWishlistExist(wishlistItem, productId) {
    return wishlistItem.findIndex((item) => item.product_id == productId)
}

const wishlistProduct = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addItemToWishlist(state, action) {
            const findIndex = findWishlistExist(state, action.payload.product_id)
            console.log(findIndex)
            if (findIndex == -1) {
                state.push(action.payload)
            }
        },

        addProductsFromdb(state, action) {
            return action.payload
        },

        removeWishlist(state, action) {
            console.log('payload Id', action)
            const itemIndex = findWishlistExist(state, action.payload.product_id);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
            }
        }
    }
})

export const { addItemToWishlist, addProductsFromdb, removeWishlist } = wishlistProduct.actions
export default wishlistProduct.reducer