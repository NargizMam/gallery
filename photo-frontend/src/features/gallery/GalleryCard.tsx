import {Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {apiURL} from "../../constants.ts";
import React, {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {getPicturesList} from "./galleryThunk.ts";
import { Author } from "../../types";

interface Props {
    title: string;
    image: string;
    author?: Author;
    id: string;
}


const GalleryCard: React.FC<Props> = ({id, title, author, image}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    let cardImage;
    if (image) {
        if (!image.includes('fixtures')) {
            cardImage = apiURL + '/images/' + image;
        }else{
            cardImage = apiURL + '/' + image;
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const openUsersGallery = () => {
        navigate();
    }
    return (
        <Card sx={{width: '30%',height: '250px', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
            <CardActionArea onClick={handleOpen}>
                <CardMedia
                    component="img"
                    sx={{width:'95%', height: 175, borderRadius: 1}}
                    image={cardImage}
                    title={title}/>
            </CardActionArea>
                {author &&(
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Author:
                            <Typography
                                component={NavLink}
                                to={`/usersGallery?users=${author?._id}`}
                                variant="h6"
                            >
                                {author.displayName}
                            </Typography>
                        </Typography>
                    </CardContent>
                )}
            <Dialog open={open} onClose={handleClose} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: '100%',
                }
            }}>
                <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    Close
                </IconButton>
                <DialogContent sx={{p: 10}}>
                    <img src={cardImage} width='600px' style={{margin: '5px'}} alt={title} />
                </DialogContent>
            </Dialog>


        </Card>
    );
};

export default GalleryCard;