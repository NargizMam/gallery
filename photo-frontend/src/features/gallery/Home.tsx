import {Grid, Typography } from "@mui/material";
import GalleryCard from "./GalleryCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getPicturesList} from "./galleryThunk.ts";
import {selectPicturesList, selectPicturesListFetching} from "./gallerySlice.ts";
import Loading from "../../components/UI/Loading/Loading.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const picturesList = useAppSelector(selectPicturesList);
    const fetchingLoading = useAppSelector(selectPicturesListFetching);

    useEffect(() => {
        dispatch(getPicturesList());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
              Impressions in the Lens: <br /> "Dive into the World of Photographs"
            </Typography>
            {fetchingLoading && <Loading/>}
            <Grid container>
                {picturesList.map(picture =>(
                    <GalleryCard
                        key={picture._id}
                        id={picture._id}
                        title={picture.title}
                        image={picture.image}
                        user={picture.user}
                    />
                ))}
            </Grid>

        </>
    );
};

export default Home;