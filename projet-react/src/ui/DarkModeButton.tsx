import { Box, Button } from '@mui/material'
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from './slice';

function DarkModeButton() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
            <Button onClick={() => dispatch(changeTheme())} size='large'>
                {isDarkMode ? < FaSun /> : <FaMoon />}
            </Button>
        </Box>
    )
}

export default DarkModeButton