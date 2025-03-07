import { Drawer, Divider, IconButton, List, ListItemButton, Toolbar, useMediaQuery, useTheme, Box } from '@mui/material';
import { Fragment, useState } from 'react';
import { FaBell, FaHome, FaList, FaPowerOff, FaUser } from 'react-icons/fa';
import { disconnect, getIdWithToken, getToken } from '../domains/auth/service';
import { useNavigate } from 'react-router-dom';

function DrawerResponsive({ children }: any) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Détecte les écrans petits

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <Fragment>
            {/* Toolbar avec le bouton d'ouverture du Drawer uniquement pour mobile et tablette */}
            <Toolbar sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1201 }}>
                {isMobile && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <FaList />
                    </IconButton>
                )}
            </Toolbar>

            <div style={{ display: 'flex' }}>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer}
                    variant={isMobile ? "temporary" : "permanent"} // "temporary" sur mobile, "permanent" sur desktop
                    sx={{
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: isMobile ? '70vw' : '250px',  // Ajuste la largeur du Drawer
                            boxSizing: 'border-box',
                            backgroundColor: theme.palette.background.paper,
                            padding: 2,
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}>
                    <div
                        role="presentation"
                        onClick={toggleDrawer}
                        onKeyDown={toggleDrawer}
                        style={{ padding: 20 }}>

                        {/* List of Navigation Items */}
                        <List>
                            <ListItemButton onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FaHome style={{ marginRight: 10 }} />
                                Home
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate(`/profile/${getIdWithToken(getToken())}`)} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FaUser style={{ marginRight: 10 }} />
                                Profile
                            </ListItemButton>
                        </List>
                        <Divider />
                        {/* Disconnect Button */}
                        <List>
                            <ListItemButton onClick={() => disconnect(navigate)} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FaPowerOff style={{ marginRight: 10 }} />
                                Disconnect
                            </ListItemButton>
                        </List>
                    </div>
                </Drawer>

                {/* Main Content Box */}
                <Box
                    component="div"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        transition: 'margin-left 0.3s ease',
                        marginLeft: isMobile ? '0' : '250px',  // Ajuste le contenu à gauche lorsque le Drawer est ouvert
                        paddingTop: theme.spacing(8), // Espace pour la toolbar fixée
                    }}>
                    {children}
                </Box>
            </div>
        </Fragment>
    );
}

export default DrawerResponsive;
