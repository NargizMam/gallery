import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'Пользователь не найден!',
        },
    },
    title: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now
    }
});

const Picture = mongoose.model('Picture', PictureSchema);
export default Picture;
