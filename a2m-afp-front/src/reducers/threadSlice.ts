import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    selectedCommentId: null,
    selectedIsBookmark: null,
}

const threadSlice = createSlice({
    name: 'afpSideBar',
    initialState,
    reducers: {
        setSelectedCommentId: (state, action) => {
            state.selectedCommentId = action.payload
        },
        setSelectedIsBookmark: (state, action) => {
            state.selectedIsBookmark = action.payload
        },
        resetSelectedCommentId: (state, action) => {
            state.selectedCommentId = null
        },
        resetSelectedIsBookmark: (state, action) => {
            state.selectedIsBookmark = null
        }
    }
})

export default threadSlice.reducer
export const { setSelectedCommentId, setSelectedIsBookmark, resetSelectedCommentId, resetSelectedIsBookmark } = threadSlice.actions


export const folding = (state: any) => state.threadSlice.folding;
export const selectedIsBookmarkSelector = (state: any) => state.threadSlice.selectedIsBookmark;
export const selectedCommentIdSelector = (state: any) => state.threadSlice.selectedCommentId;
export const resetSelectedCommentIdSelector = (state: any) => state.threadSlice.resetSelectedCommentId;
export const resetSelectedIsBookmarkSelector = (state: any) => state.threadSlice.resetSelectedIsBookmark;
