import {GlobalError, PictureApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createPicture, deletePicture, getPicturesList} from "./galleryThunk.ts";

interface PicturesState {
    picturesList: PictureApi[];
    fetchLoading: boolean;
    creating: boolean,
    deleting: boolean;
    successMessage: string | null;
    errorMessage: GlobalError | null;
}
const initialState: PicturesState = {
    picturesList: [],
    fetchLoading: false,
    creating: false,
    deleting: false,
    successMessage: null,
    errorMessage: null,
}
const PicturesSlice = createSlice({
    name: 'Pictures',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPicturesList.pending, (state) => {
                state.fetchLoading = true;
                state.picturesList = [];
            })
            .addCase(getPicturesList.fulfilled, (state, {payload: pictures}) => {
                state.fetchLoading = false;
                state.picturesList = pictures;
            })
            .addCase(getPicturesList.rejected, (state) => {
                state.fetchLoading = false;
                state.picturesList = [];
            })
            .addCase(createPicture.pending, (state) => {
                state.creating = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(createPicture.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.successMessage = success;
                state.errorMessage = null;
            })
            .addCase(createPicture.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.errorMessage = error || null;
                state.successMessage = null;
            })
            .addCase(deletePicture.pending, (state) => {
                state.creating = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(deletePicture.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.successMessage = success;
                state.errorMessage = null;
            })
            .addCase(deletePicture.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.errorMessage = error || null;
                state.successMessage = null;
            });

    }
});

export const PicturesReducer = PicturesSlice.reducer;

export const selectPicturesList = (state: RootState) => state.pictures.picturesList
export const selectPicturesListFetching = (state: RootState) => state.pictures.fetchLoading;
export const selectPicturesCreating = (state: RootState) => state.pictures.creating;

export const selectPictureDeleting = (state: RootState) => state.pictures.deleting;
export const selectSuccessMessage = (state: RootState) => state.pictures.successMessage;
export const selectErrorMessage = (state: RootState) => state.pictures.errorMessage;
