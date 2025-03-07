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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password: string) => {
        const minLength = 6; // Min 6 characters
        const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character

        if (password.length < minLength) {
            return "Password must be at least 6 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const passwordError = validatePassword(password);

        if (passwordError) {
            setError(passwordError);
        } else if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
        } else {
            setError("");
            handleSignupSubmit(e, email, password, passwordConfirmation, navigate);
        }
    };

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
                    <form onSubmit={handleSubmit}>
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
                                error={!!error}
                                helperText={error && error.includes('Password') ? error : ''}
                            />
                            <TextField
                                label="Confirm Password"
                                type='password'
                                variant="outlined"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                sx={{ borderRadius: 3 }}
                                fullWidth
                                error={!!error}
                                helperText={error && error.includes('Passwords') ? error : ''}
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
                                Create Account
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
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}

export default AlreadyAuthGuard(Signup);
