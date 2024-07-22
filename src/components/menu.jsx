import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Drawer } from '@mui/material';
import { DrawerContext } from '../App';
import { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { AuthContext } from '../context/authcontext';
const Menu = ({items,disb}) => {
    const {open,openDrawer} = useContext(DrawerContext)
    const {userRole} = useContext(AuthContext)
    const menuItems = items.map((item) => {
        if (item.id != 0){
            return ( 
                <a href={disb?userRole==2?'http://localhost:5173'+item.path:'':'http://localhost:5173'+item.path} key={item.id} className="menuitem">
                    <MenuItem sx={{width:{xl:400, lg:400,md:350,sm:350,xs:350 }, whiteSpace:"pre-line"}}>
                        {item.text}
                    </MenuItem>
                </a>
            )
        }
    })

    return (
        <Drawer open={open} onClose={openDrawer} variant="persistent">
            <Toolbar />
                <MenuList>
                    {menuItems}
                </MenuList>
        </Drawer>
    )
}
export default Menu
