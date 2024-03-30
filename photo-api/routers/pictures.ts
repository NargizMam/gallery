import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import client from '../middleware/client';
import permit from '../middleware/permit';
import Picture from "../models/Picture";
import {PictureApi, PictureMutation} from "../types";
import {Types} from "mongoose";

const picturesRouter = express.Router();

picturesRouter.get('/', client, async (req: RequestWithUser, res, next) => {
    let authorId: Types.ObjectId | undefined;

    let picturesList: PictureApi[] = [];
    try {
        if (req.query.users) {
            authorId = new Types.ObjectId(req.query.users  as string)
            picturesList = await Picture.find({ user: authorId}).populate('user', 'displayName');
            return res.send(picturesList);
        }
        picturesList = await Picture.find().populate('user', 'displayName');
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
