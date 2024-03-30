import {LoadingButton} from "@mui/lab";
import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import IngredientForm from "./components/IngredientForm.tsx";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectPicturesCreating} from "./PicturesSlice.ts";
import {useNavigate} from "react-router-dom";
import {createPicture, getPicturesList} from "./PicturesThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../WarningMessage/warningMessageSlice.ts";

const initialState = {
    title: '',
    image: '',
    recipe: '',
    ingredients: [{
        title: '',
        amount: ''
    }]
}


const NewPicture = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [Picture, setPicture] = useState(initialState);
    const creating = useAppSelector(selectPicturesCreating);
    const handleAddIngredient = () => {
        setPicture({
            ...Picture,
            ingredients: [...Picture.ingredients, { title: '', amount: '' }],
        });
    };
    const handleIngredientChange = (value: string, field: 'title' | 'amount', index: number) => {
        const updatedIngredients = [...Picture.ingredients];
        updatedIngredients[index][field] = value;
        setPicture({ ...Picture, ingredients: updatedIngredients });
    };
    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = [...Picture.ingredients];
        updatedIngredients.splice(index, 1);
        setPicture({ ...Picture, ingredients: updatedIngredients });
    };

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPicture(prevState => {
            return { ...prevState, [name]: value };
        });
    };
    const fieldsError = !Picture.title || !Picture.recipe || !Picture.image || !Picture.ingredients[0].title || !Picture.ingredients[0].amount;
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
        try{
            await dispatch(createPicture(Picture));
            dispatch(openSuccessMessage());
            dispatch(getPicturesList());
            navigate('/');
        }catch (e) {
            dispatch(openErrorMessage());
        }

    };

    return (
        <Grid container direction="column" pt={2}>
            <form onSubmit={handleSubmit}>
                <Typography p={2}>Add new Picture</Typography>
                <TextField
                    label="Pictures name"
                    value={Picture.title}
                    name="title"
                    required
                    onChange={changeInput}
                />
                <Grid item xs>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileInputChangeHandler}
                        onClear={onImageClear}
                    />
                </Grid>
                <TextField
                    label="Recipe"
                    multiline
                    name="recipe"
                    required
                    rows={4}
                    value={Picture.recipe}
                    onChange={changeInput}
                />
                <Grid item xs={12}>
                    <Typography>Ingredients</Typography>
                    {Picture.ingredients.map((ingredient, index) => (
                        <IngredientForm
                            key={index}
                            ingredient={ingredient}
                            onChange={(value: string, field: 'title' | 'amount') => handleIngredientChange(value, field, index)}
                            onRemove={() => handleRemoveIngredient(index)}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"  onClick={handleAddIngredient}>
                        Add Ingredient
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={creating}
                        disabled={fieldsError}
                        variant="contained"
                        color="primary"
                        type="submit">
                        Create
                    </LoadingButton>
                </Grid>
            </form>
        </Grid>

    );
};

export default NewPicture;
