import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import client from '../middleware/client';
import permit from '../middleware/permit';
import Picture from "../models/Picture";
import {PictureApi, PictureMutation} from "../types";

const picturesRouter = express.Router();

picturesRouter.get('/', client, async (_req: RequestWithUser, res, next) => {
    // const userName = req.query.authors;
    let picturesList: PictureApi[] = [];
    try {
            picturesList = await Picture.find().populate('user', 'displayName');

        // if (userName) {
        //     picturesList = await Picture.find({ user: user?._id.toString() });
        // }
        return res.send(picturesList);
    } catch (e) {
        next(e);
    }
});
picturesRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        if (!user?._id) return;
        const picturesData: PictureMutation = {
            user: user._id.toString(),
            title: req.body.title,
            image: req.file ? req.file.filename : null,
        };
        const picture = new Picture(picturesData);
        await picture.save();
        return res.send('Picture was created!');
    } catch (e) {
        next(e);
    }
});
picturesRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    const id = req.params.id;

    try {
        let deletedPicture;
        deletedPicture = await Picture.findByIdAndDelete(id);

        if (!deletedPicture) {
            return res.send('The photo may have been removed!');
        }
        return res.send('The photo was successfully deleted!');
    } catch (e) {
        next(e);
    }
});

export default picturesRouter;
