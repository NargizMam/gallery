import GalleryCard from "./GalleryCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {getPicturesList} from "./galleryThunk.ts";
import {selectPicturesList, selectPicturesListFetching} from "./gallerySlice.ts";
import Typography from "@mui/material/Typography";
import {Box, Button, Grid} from "@mui/material";
import {selectUser} from "../users/usersSlice.ts";
import {NavLink} from "react-router-dom";
import Loading from "../../components/UI/Loading/Loading.tsx";

const UsersGallery = () => {
    const dispatch = useAppDispatch();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('users');
    const userClient = useAppSelector(selectUser);
    const usersGallery = useAppSelector(selectPicturesList);
    const fetchingLoading = useAppSelector(selectPicturesListFetching);
    const [authorName, setAuthorName] = useState('');

    let addNewPicture;
    useEffect(() => {
        if (id) {
            dispatch(getPicturesList(id)).unwrap;
        }
        setAuthorName('');
    }, [dispatch, id]);

    useEffect(() => {
        if (usersGallery.length > 0) {
            const name = usersGallery[0].user.displayName;
            setAuthorName(name);
        }
    }, [usersGallery]);

    if (id === userClient?._id) {
        addNewPicture = (
            <Box ml="auto">
                <Button component={NavLink} to="/new-picture" variant="contained" color="primary">
                    Add new picture
                </Button>
            </Box>)
    }

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Галерея пользователя {authorName}
            </Typography>
            <Grid container>
                {addNewPicture}
            </Grid>
            <Grid container>
                {fetchingLoading && <Loading/>}
                {usersGallery.map(picture => (
                    <GalleryCard
                        key={picture._id}
                        id={picture._id}
                        title={picture.title}
                        image={picture.image}
                        user={picture.user}
                        isUsersActions
                    />
                ))}
            </Grid>

        </>
    );
};

export default UsersGallery;