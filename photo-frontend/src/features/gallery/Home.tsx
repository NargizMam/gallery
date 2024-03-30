import { Typography } from "@mui/material";
import GalleryCard from "./GalleryCard";

const Home = () => {
    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Импрессии в Объективе: <br /> "Погружение в Мир Фотографий"
            </Typography>
            <GalleryCard/>
        </>
    );
};

export default Home;