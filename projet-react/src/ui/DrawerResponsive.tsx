import { Drawer, Divider, IconButton, List, ListItemButton, Toolbar, useMediaQuery, useTheme, Box } from '@mui/material'
import { Fragment, useState } from 'react'
import { FaBell, FaHome, FaList, FaPowerOff, FaUser } from 'react-icons/fa'
import { disconnect } from '../domains/auth/service'
import { useNavigate } from 'react-router-dom';

function DrawerResponsive({ children }: any) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <Fragment>
            <Toolbar style={{ position: 'fixed', top: 0 }}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                    <FaList />
                </IconButton>
            </Toolbar>
            <div style={{ display: 'flex' }}>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer}
                    variant={isMobile ? "temporary" : "permanent"}
                    sx={isMobile ?
                        {
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: '70vw',
                                boxSizing: 'border-box',
                            },
                        } :
                        {
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: '30vw',
                                boxSizing: 'border-box',
                            },
                        }}>
                    <div
                        role="presentation"
                        onClick={toggleDrawer}
                        onKeyDown={toggleDrawer}
                        style={{ padding: 20 }}>

                        <List>
                            <ListItemButton onClick={() => navigate('/')}><FaHome />Home</ListItemButton>
                            <ListItemButton><FaUser />Profile</ListItemButton>
                            <ListItemButton><FaBell />Notification</ListItemButton>
                        </List>
                        <Divider />
                        <List>
                            <ListItemButton onClick={() => disconnect(navigate)}><FaPowerOff />Disconnect</ListItemButton>
                        </List>
                    </div>
                </Drawer>
                <Box
                    component="div"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        transition: 'margin-left 0.3s',
                        marginLeft: isMobile ? '1vw' : '30vw',
                    }}>
                    {children}
                </Box>
            </div>
        </Fragment>
    )
}

export default DrawerResponsive