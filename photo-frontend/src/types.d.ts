export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string;
    googleID?: string;
}
export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: string ;
}
export interface LoginMutation {
    email: string;
    password: string;
}
export interface RegisterResponse {
    message: string;
    user: User;
}
export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface GlobalError {
    error: string
}
export interface Author {
    _id: string;
    displayName: string
}
export interface PictureApi {
    _id: string;
    title: string;
    image: string;
    user: Author;
    createdAt: string;
}
export interface PictureMutation {
    title: string;
    image: string | null;
}