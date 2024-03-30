import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar/AppToolbar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer.tsx";


const App = () => {
    return(
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <Container sx={{ marginBottom: '150px' }}>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<h1>Not found</h1>}/>
                </Routes>
            </Container>
            <Footer/>
        </>
    )

};

export default App
