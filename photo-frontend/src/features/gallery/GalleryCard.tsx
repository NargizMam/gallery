import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent,
    IconButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {apiURL} from "../../constants.ts";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {Author} from "../../types";
import {selectUser} from "../users/usersSlice.ts";
import {LoadingButton} from "@mui/lab";
import {deletePicture, getPicturesList} from "./galleryThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../WarningMessage/warningMessageSlice.ts";
import {selectPictureDeleting} from "./gallerySlice.ts";

interface Props {
    title: string;
    image: string;
    user: Author;
    id: string;
    isUsersActions?: boolean;
}


const GalleryCard: React.FC<Props> = ({id, title, user, image, isUsersActions}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userClient = useAppSelector(selectUser);
    const deleting = useAppSelector(selectPictureDeleting);
    const [open, setOpen] = useState(false);

    let cardImage;
    if (image) {
        if (!image.includes('fixtures')) {
            cardImage = apiURL + '/images/' + image;
        } else {
            cardImage = apiURL + '/' + image;
        }
    }
    let pictureAction;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onDeletePicture = async () => {
        try {
            await dispatch(deletePicture(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getPicturesList());
            navigate('/');
        } catch (e) {
            dispatch(openErrorMessage());
        }
    }

    if ((isUsersActions && userClient?._id === user._id) || (userClient && userClient.role === 'admin')) {
        pictureAction = (
            <LoadingButton
                loading={deleting}
                onClick={onDeletePicture}>
                Delete
            </LoadingButton>
        );
    }
    return (
        <>
            <Card
                sx={{width: '35%', height: '300px', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
                <CardActionArea onClick={handleOpen}>
                    <CardMedia
                        component="img"
                        sx={{width: '95%', height: 150, borderRadius: 1}}
                        image={cardImage}
                        title={title}/>
                </CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        Author:
                        <Typography
                            component={NavLink}
                            to={!isUsersActions ? `/usersGallery/${user?._id}` : ''}
                            variant="h6"
                        >
                           <span></span> {user.displayName}
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    {pictureAction}
                </CardActions>
            </Card>
            <Dialog open={open} onClose={handleClose} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: '100%',
                }
            }}>
                <IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: 8, top: 8}}>
                    Close
                </IconButton>
                <DialogContent sx={{p: 10}}>
                    <img src={cardImage} width='600px' style={{margin: '5px'}} alt={title}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GalleryCard;