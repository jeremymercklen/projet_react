import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsConnected } from './service';
import { setIsConnected } from './slice';

const AuthGuard = (WrappedComponent: any) => {
    const Auth = (props: any) => {
        const dispatch = useDispatch();
        const isConnected: boolean = useSelector((state: any) => state.connection.isConnected)
        const navigate = useNavigate();

        useEffect(() => {
            const getConnectionStatus = async () => {
                const isAuth = await getIsConnected()
                dispatch(setIsConnected(isAuth));
                if (!isAuth) {
                    navigate('/login');
                }
            }

            getConnectionStatus();
        }, [])

        return isConnected ? <WrappedComponent {...props} /> : null;
    };
    return Auth;
}

export default AuthGuard;