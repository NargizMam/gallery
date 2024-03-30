import {Grid, Typography } from "@mui/material";
import GalleryCard from "./GalleryCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getPicturesList} from "./galleryThunk.ts";
import {selectPicturesList} from "./gallerySlice.ts";

const Home = () => {
    const dispatch = useAppDispatch();
    const picturesList = useAppSelector(selectPicturesList);

    useEffect(() => {
        dispatch(getPicturesList());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Импрессии в Объективе: <br /> "Погружение в Мир Фотографий"
            </Typography>
            <Grid container>
                {picturesList.map(picture =>(
                    <GalleryCard
                        key={picture._id}
                        id={picture._id}
                        title={picture.title}
                        image={picture.image}
                        author={picture.user}
                    />
                ))}
            </Grid>

        </>
    );
};

export default Home;