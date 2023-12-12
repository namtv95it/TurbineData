import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    menus: [],
    projectCounter: 0
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setMenus: (state, action) => {
            state.menus = action.payload
        },
        setProjectCounter: (state, action) => {
            state.projectCounter = action.payload
        }
    }
})

export default sidebarSlice.reducer
export const { setMenus, setProjectCounter } = sidebarSlice.actions