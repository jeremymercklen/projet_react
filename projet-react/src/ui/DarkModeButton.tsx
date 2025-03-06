import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './slice';

function DarkModeButton() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Pour afficher le bouton seulement sur les petits écrans

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'fixed',
                top: 20,
                right: 20,
                zIndex: 1300, // Pour le garder en haut
                padding: 1,
            }}
        >
            <Button
                onClick={() => dispatch(changeTheme())}
                size="large"
                sx={{
                    backgroundColor: isDarkMode ? '#1DA1F2' : '#657786',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                        backgroundColor: isDarkMode ? '#1A91D1' : '#4C6B7D',
                    },
                }}
            >
                {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </Button>
        </Box>
    );
}

export default DarkModeButton;
