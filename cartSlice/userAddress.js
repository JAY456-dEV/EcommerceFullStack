import { createSlice } from "@reduxjs/toolkit"

const userAddress = createSlice({
    name: 'userAddress',
    initialState: {},
    reducers: {
        addUserAddress(state, action) {
            return action.payload
        }
    }
})

export const { addUserAddress } = userAddress.actions
export default userAddress.reducer