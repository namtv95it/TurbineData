import { createSlice } from "@reduxjs/toolkit";
import { Constant } from "../constants/constant";

const initialState = {
    lang: localStorage.getItem(Constant.LANGUAGE) == null || localStorage.getItem(Constant.LANGUAGE) == "" ? Constant.ENGLISH : localStorage.getItem(Constant.LANGUAGE)
}

const multiLangSilce = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeMultiLang: (state, action) => {
            state.lang = action.payload
        }
    }
})

export default multiLangSilce.reducer
export const { changeMultiLang } = multiLangSilce.actions