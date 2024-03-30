import {Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import {apiURL} from "../../constants.ts";
import React, {useState} from "react";
import { Close } from "@mui/icons-material";

interface Props {
    title: string;
    image: string;
    author: string;
    id: string;
}


const GalleryCard: React.FC<Props> = ({id, title, author, image}) => {
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

    return (
        <Card sx={{width: '30%',height: '250px', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
            <CardActionArea onClick={handleOpen}>
                <CardMedia
                    component="img"
                    sx={{width:'95%', height: 175, borderRadius: 1}}
                    image={cardImage}
                    title={title}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Author:
                        <Typography component={NavLink} to={'/'}>
                            {author}
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>

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