import TextField from '@mui/material/TextField';
import { FaUser } from 'react-icons/fa';
import { Box, Button } from '@mui/material';
import { login } from '../domains/auth/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={(e) => {
                e.preventDefault();
                login(email, password);
                navigate('/');
            }}>
                <div className="flex items-center justify-center flex-col">
                    <TextField label="login"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <TextField label="password"
                        type='password'
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <Button variant="outlined" type='submit' sx={{ marginRight: 1 }}><FaUser />Connect</Button>
                </div>
            </form>
        </Box>
    )
}

export default Login