import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

const GalleryCard = () => {
    return (
        <Card >
            <CardActionArea>
                <CardMedia/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Author:
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GalleryCard;