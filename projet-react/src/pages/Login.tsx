import TextField from '@mui/material/TextField';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { Box, Button } from '@mui/material';
import { handleLoginFormSubmit } from '../domains/auth/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlreadyAuthGuard from '../domains/auth/AlreadyAuthGuard';
import DarkModeButton from '../ui/DarkModeButton';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <DarkModeButton />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={(e) => handleLoginFormSubmit(e, email, password, navigate)}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField label="email"
                            type='email'
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ m: 1 }} />
                        <TextField label="password"
                            type='password'
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ m: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
                        <Button variant="contained" type='submit' sx={{ marginRight: 1 }} ><FaUser />Connect</Button>
                        <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => navigate('/signup')} ><FaUserPlus />Sign up</Button>
                    </Box>
                </form >
            </Box >
        </>
    )
}

export default AlreadyAuthGuard(Login); 