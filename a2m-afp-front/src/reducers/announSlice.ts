import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HeadersUtil } from "../utils/headersUtil";

const initialState: any = {
    announInfo: {}
}

export const getAnnounInfo = createAsyncThunk('announ/getAnnounInfo', async () => {
    return axios.get(process.env.REACT_APP_API_URL + "/common-post/announ/getAnnounNotiInfo.exclude", {
        headers: HeadersUtil.getHeadersAuth()
    })
});

export const remakeAnnounNoti = createAsyncThunk('announ/remakeAnnounNoti', async () => {
    return axios.post(process.env.REACT_APP_API_URL + "/common-post/announ/remakeAnnounNoti.exclude", null , {
        headers: HeadersUtil.getHeadersAuth()
    })
});

const announSlice = createSlice({
    name: 'announ',
    initialState,
    reducers: {
        updateAnnounInfo: (state, action) => {
            state.announInfo = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getAnnounInfo.pending, state => {
        })
        builder.addCase(getAnnounInfo.fulfilled, (state, action: any) => {
            if (action.payload.data.status) {
                state.announInfo = action.payload.data.responseData
            }
        })
        builder.addCase(getAnnounInfo.rejected, (state, action: any) => {
            state.announInfo = {}
        })

        builder.addCase(remakeAnnounNoti.pending, state => {
        })
        builder.addCase(remakeAnnounNoti.fulfilled, (state, action: any) => {
            if (action.payload.data.status) {
                state.announInfo = action.payload.data.responseData
            }
        })
        builder.addCase(remakeAnnounNoti.rejected, (state, action: any) => {
            state.announInfo = {}
        })
    },
});

export default announSlice.reducer
export const { updateAnnounInfo } = announSlice.actions