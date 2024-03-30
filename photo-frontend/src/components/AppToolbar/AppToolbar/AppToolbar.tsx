import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import {selectUser} from "../../../features/users/usersSlice.ts";
import {useAppSelector} from '../../../app/hooks.ts';

const Link = styled(NavLink)({
    color: "darkgray",
    textDecoration: 'none',
    '&:hover': {
        color: 'dark'
    },
});
const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: '#dfe2e3',
            display: {xs: 'flex'},
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
        }}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'flex'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/">Gallery</Link>
                    </Typography>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : <AnonymousMenu/>}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
