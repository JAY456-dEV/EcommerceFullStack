import { configureStore } from "@reduxjs/toolkit"
import addToCartItem from '../cartSlice/addItemSlice'
import allProducts from '../cartSlice/getAllProducts'
import chooseShipping from '../cartSlice/chooseShipping'
import userAddress from '../cartSlice/userAddress'
import wishlistProduct from '../cartSlice/wishlist'

export const makeStore = () => {
    return configureStore({
        reducer: {
            addedItem: addToCartItem,
            getReduxProductsData: allProducts,
            choosedShipping: chooseShipping,
            userAddress,
            wishlistProduct
        }
    })
}