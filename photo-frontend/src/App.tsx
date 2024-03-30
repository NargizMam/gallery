import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer.tsx";
import Home from "./features/gallery/Home.tsx";
import UsersGallery from "./features/gallery/UsersGallery.tsx";
import NewPicture from "./features/gallery/NewPicture.tsx";
import WarningMessage from "./features/WarningMessage/WarningMessages.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import { selectUser } from "./features/users/usersSlice.ts";


const App = () => {
    const user = useAppSelector(selectUser);

    return(
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <Container sx={{ marginBottom: '150px'}}>
                <WarningMessage/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/new-picture"  element={(
                        <ProtectedRoute isAllowed={!!user}>
                            <NewPicture/>
                        </ProtectedRoute>)}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/usersGallery" element={<UsersGallery/>}/>
                    <Route path="*" element={<h1>Not found</h1>}/>
                </Routes>
            </Container>
            <Footer/>
        </>
    )

};

export default App
