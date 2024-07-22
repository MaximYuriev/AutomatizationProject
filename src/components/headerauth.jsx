import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const AuthHeader = ({text}) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div">
                    {text}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AuthHeader