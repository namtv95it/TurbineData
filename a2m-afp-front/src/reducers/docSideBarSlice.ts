import { createSlice } from "@reduxjs/toolkit";


const getParams = (paramName: any) => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get(paramName);
}

const initialState = {
    // selectedSideBarMenu: localStorage.getItem("selectedSideBarMenu"),
    selectedSideBarMenu: getParams("docMenuId"),
    selectedSideBarEditMenuId: null,
    // selectedTsstMenuId: localStorage.getItem("selectedTsstMenuId")
    selectedTsstMenuId: getParams("tsstMenuId"),
}

const docSideBarSlice = createSlice({
    name: 'afpSideBar',
    initialState,
    reducers: {
        setSelectedSideBarMenuId: (state, action) => {
            // localStorage.setItem("selectedSideBarMenu", action.payload);
            state.selectedSideBarMenu = action.payload
        },
        setSelectedSideBarEditMenuId: (state, action) => {
            state.selectedSideBarEditMenuId = action.payload
        },
        setSelectedTsstMenuId: (state, action) => {
            // localStorage.setItem("selectedTsstMenuId", action.payload);
            state.selectedTsstMenuId = action.payload
        },

    }
})

export default docSideBarSlice.reducer
export const { setSelectedSideBarMenuId, setSelectedSideBarEditMenuId, setSelectedTsstMenuId } = docSideBarSlice.actions

export const selectedSideBarMenuIdSelector = (state: any) => state.docSideBar.selectedSideBarMenu;
export const selectedSideBarEditMenuIdSelector = (state: any) => state.docSideBar.selectedSideBarEditMenuId;
export const folding = (state: any) => state.docSideBar.folding;
export const selectedTsstMenuIdSelector = (state: any) => state.docSideBar.selectedTsstMenuId;