import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false
}

const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        showAndHideSpinner: (state, action) => {
            state.loading = action.payload
        }
    }
})

export default spinnerSlice.reducer
export const { showAndHideSpinner } = spinnerSlice.actions