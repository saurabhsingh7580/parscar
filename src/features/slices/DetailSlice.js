import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Url } from '../../utils/Urls';

const INTIAL_STATE = {
  detailResponse: {
    response: null,
    loading: false,
  },
};

export const fetchAsyncDetail = createAsyncThunk(
  'detail/fetchAsyncDetail',
  async value => {
    let token = await AsyncStorage.getItem('token');
    const response = await axios.get(Url.OrderDetail + `id=${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

export const detailslice = createSlice({
  initialState: INTIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncDetail.pending, (state, action) => {
      state.detailResponse.loading = true;
    });

    builder.addCase(fetchAsyncDetail.fulfilled, (state, action) => {
      state.detailResponse.response = action.payload;
      state.detailResponse.loading = false;
    });

    builder.addCase(fetchAsyncDetail.rejected, (state, action) => {
      state = { ...state, detailResponse: INTIAL_STATE.detailResponse };
    });
  },
});

export default detailslice.reducer;
