import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSignupSubmit } from '../domains/auth/service';
import AlreadyAuthGuard from '../domains/auth/AlreadyAuthGuard';
import DarkModeButton from '../ui/DarkModeButton';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <DarkModeButton />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={(e) => handleSignupSubmit(e, email, password, passwordConfirmation, navigate)}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField label="email"
                            variant="outlined"
                            type='email'

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ m: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField label="password"
                            type='password'
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ m: 1 }} />

                        <TextField label="confirm password"
                            type='password'
                            variant="outlined"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            sx={{ m: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
                        <Button variant="contained" type='submit' sx={{ marginRight: 1 }} >Create account</Button>
                        <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => navigate('/login')} >login</Button>
                    </Box>
                </form >
            </Box >
        </>
    )
}

export default AlreadyAuthGuard(Signup)