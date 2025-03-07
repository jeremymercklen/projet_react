import TextField from '@mui/material/TextField';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { Box, Button, Checkbox } from '@mui/material';
import { handleLoginFormSubmit } from '../domains/auth/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlreadyAuthGuard from '../domains/auth/AlreadyAuthGuard';
import DarkModeButton from '../ui/DarkModeButton';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isStayConnected, setStayConnected] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <DarkModeButton />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'background.default',
                padding: 2,
            }}>
                <Box sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '8px',
                    padding: 4,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '450px',
                    textAlign: 'center'
                }}>
                    <form onSubmit={(e) => handleLoginFormSubmit(e, email, password, navigate, isStayConnected)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Email"
                                type='email'
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ borderRadius: 3 }}
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type='password'
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ borderRadius: 3 }}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 3
                        }}>
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{
                                    width: '48%',
                                    backgroundColor: '#1DA1F2',
                                    color: 'white',
                                    borderRadius: 3,
                                    padding: '12px',
                                    '&:hover': {
                                        backgroundColor: '#1A91DA',
                                    },
                                    transition: 'background-color 0.3s ease-in-out',
                                }}
                            >
                                <FaUser /> Connect
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: '48%',
                                    borderColor: '#1DA1F2',
                                    color: '#1DA1F2',
                                    borderRadius: 3,
                                    padding: '12px',
                                    '&:hover': {
                                        borderColor: '#1A91DA',
                                        color: '#1A91DA',
                                    },
                                    transition: 'color 0.3s ease-in-out, border-color 0.3s ease-in-out',
                                }}
                                onClick={() => navigate('/signup')}
                            >
                                <FaUserPlus /> Signup
                            </Button>
                        </Box>
                        <Box>
                            <Checkbox value={isStayConnected} onChange={() => setStayConnected(!isStayConnected)} />Stay connected ?
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default AlreadyAuthGuard(Login);
