import {LoadingButton} from "@mui/lab";
import {Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {selectPicturesCreating} from "./gallerySlice.ts";
import {createPicture, getPicturesList} from "./galleryThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../WarningMessage/warningMessageSlice.ts";


const initialState = {
    title: '',
    image: '',
}


const NewPicture = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [picture, setPicture] = useState(initialState);
    const creating = useAppSelector(selectPicturesCreating);


    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPicture(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const fieldsError = !picture.title || !picture.image;
    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setPicture(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };
    const onImageClear = (() => {
        setPicture(prev => ({
            ...prev,
            image: ''
        }));
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createPicture(picture));
            dispatch(openSuccessMessage());
            dispatch(getPicturesList());
            navigate('/');
        } catch (e) {
            dispatch(openErrorMessage());
        }
    };

    return (
        <Grid container direction="column" pt={2}>
            <form onSubmit={handleSubmit}>
                <Typography p={2}>Add new Picture</Typography>
                <TextField
                    label="Pictures name"
                    value={picture.title}
                    name="title"
                    required
                    onChange={changeInput}
                />
                <Grid item xs mt={3}>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileInputChangeHandler}
                        onClear={onImageClear}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={creating}
                        disabled={fieldsError}
                        variant="contained"
                        type="submit">
                        Create
                    </LoadingButton>
                </Grid>
            </form>
        </Grid>

    );
};

export default NewPicture;
