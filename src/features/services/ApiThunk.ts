import { createAsyncThunk } from '@reduxjs/toolkit';
import Url from '../../utils/Urls';
import ApiManager from './ApiManager';

export const ApiThunk = {
    Signin: createAsyncThunk('Signin', async (params, thunkAPI) => {
        ApiManager.postRequestApi(Url.Signin)
            .then(response => thunkAPI.fulfillWithValue(response))
            .catch(error => thunkAPI.rejectWithValue(error));
    }),
};
