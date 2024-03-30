import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {BrowserRouter} from "react-router-dom";
import {addInterceptors} from "./axiosApi.ts";
import {GOOGLE_CLIENT_ID} from "./constants.ts";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {persistor, store} from "./app/store.ts";
import {PersistGate} from "redux-persist/integration/react";

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
)
