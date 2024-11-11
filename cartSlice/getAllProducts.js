import { createSlice } from "@reduxjs/toolkit"

const allProducts = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProductsDataRedux(state, action) {
            return action.payload
        }
    }
})

export const { setProductsDataRedux } = allProducts.actions
export default allProducts.reducer