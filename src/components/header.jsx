import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { DrawerContext } from '../App';
import { AuthContext } from '../context/authcontext';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = ({text}) => {
    const {open,openDrawer} = useContext(DrawerContext)
    const {toggleAuth} = useContext(AuthContext)
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton size="large" color="inherit" aria-label="menu" onClick={openDrawer}>
                        <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    {text}
                </Typography>
                <IconButton size="large" color="inherit" aria-label="menu" href="http://localhost:5173/profile">
                        <FaceIcon/>
                </IconButton>
                <IconButton size="large" color="inherit" aria-label="menu" onClick={toggleAuth}>
                        <LogoutIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>

    )
}

export default Header