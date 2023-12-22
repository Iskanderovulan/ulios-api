import { createSlice } from "@reduxjs/toolkit";


const infoSlice = createSlice({
    name: 'info',
    initialState: {
        info: {
            name: null,
            email: null,
            verified: null
        }
    },
    reducers: {
        handleInfo(state, action) {
            state.info = action.payload
        }
    }
})

export const { handleInfo } = infoSlice.actions
export default infoSlice.reducer