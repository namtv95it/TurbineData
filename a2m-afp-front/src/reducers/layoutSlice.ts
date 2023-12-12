
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sideBarShow: true,
    sideBarShowSmall: false
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        sideBarShowReducer: (state, action) => {
            state.sideBarShow = action.payload
        },
        sideBarShowReducerSmall: (state, action) => {
            state.sideBarShowSmall = action.payload
        }
    },
    // extraReducers: builder => {
    //     builder.addCase(getRoleGuards.pending, state => {
    //     })
    //     builder.addCase(getRoleGuards.fulfilled, (state, action) => {
    //         state.roleGuards = action.payload.data
    //         state.error = ''
    //     })
    //     builder.addCase(getRoleGuards.rejected, (state, action) => {
    //         state.roleGuards = []
    //         state.error = action.error.message
    //     })
    // }
})

export default layoutSlice.reducer
export const { sideBarShowReducer, sideBarShowReducerSmall } = layoutSlice.actions