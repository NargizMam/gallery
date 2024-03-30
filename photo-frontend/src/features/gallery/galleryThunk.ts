import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import {GlobalError, PictureApi, PictureMutation} from "../../types";

export const createPicture = createAsyncThunk<string, PictureMutation, { rejectValue: GlobalError }>(
    'pictures/create',
    async (pictureMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            const keys = Object.keys(pictureMutation) as (keyof PictureMutation)[];
            keys.forEach(key => {
                const value = pictureMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });
            const response = await axiosApi.post('/pictures', formData);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);

export const getPicturesList = createAsyncThunk<PictureApi[], string | undefined, { rejectValue: GlobalError }>(
    'pictures/fetch',
    async (userName, {rejectWithValue}) => {
        try {
            let response;
            if(userName){
                response = await axiosApi.get<PictureApi[]>(`/pictures?users=${userName}`);
                return response.data;
            }
            response = await axiosApi.get<PictureApi[]>('/pictures');
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);

export const deletePicture = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
    'pictures/delete',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/pictures/${id}`);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);