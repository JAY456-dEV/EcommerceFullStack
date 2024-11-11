import { createSlice } from "@reduxjs/toolkit"

const chooseShipping = createSlice({
    name: 'chooseShipping',
    initialState: false,
    reducers: {
        chooseShippingOption(state, action) {
            return action.payload
        }
    }
})

export const { chooseShippingOption } = chooseShipping.actions
export default chooseShipping.reducer