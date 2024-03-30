import GalleryCard from "./GalleryCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {getPicturesList} from "./galleryThunk.ts";
import {selectPicturesList} from "./gallerySlice.ts";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const UsersGallery = () => {
    const dispatch = useAppDispatch();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('users');
    const usersGallery = useAppSelector(selectPicturesList);
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        if(id){
            dispatch(getPicturesList(id)).unwrap;
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (usersGallery.length > 0) {
            const name = usersGallery[0].user.displayName;
            setAuthorName(name);
        }
    }, [usersGallery]);


    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Галерея пользователя {authorName}
            </Typography>
            <Grid container>
                {usersGallery.map(picture =>(
                    <GalleryCard
                        key={picture._id}
                        id={picture._id}
                        title={picture.title}
                        image={picture.image}
                    />
                ))}
            </Grid>

        </>
    );
};

export default UsersGallery;