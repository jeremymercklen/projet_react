import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DrawerResponsive from '../ui/DrawerResponsive';
import { getUserEmailById } from '../domains/auth/service';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../app/store';
import { Tweet } from '../domains/tweets/types';
import DarkModeButton from '../ui/DarkModeButton';
import TweetItem from '../ui/TweetItem';
import { getTweetsOrderByDate } from '../domains/tweets/slice';
import AuthGuard from '../domains/auth/AuthGuard';
import { isSameUser } from '../domains/users/services';

function Profile() {
    const tweets: Tweet[] = useAppSelector((state: any) => state.tweets.tweets);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUserEmail = async () => {
            setEmail(await getUserEmailById(Number(id)));
        }
        dispatch(getTweetsOrderByDate());
        getUserEmail();
    }, [])

    return (
        <DrawerResponsive>
            <DarkModeButton />
            <Box sx={{ margin: 1 }}>
                {
                    isSameUser(Number(id)) ?
                        <Fragment /> :
                        <Button>Follow</Button>
                }
                <Typography fontSize={25}>{email}</Typography>
                {
                    tweets.filter((tweet) => tweet.userId === Number(id)).map((tweet: Tweet, index) => (
                        <TweetItem tweet={tweet} key={index} />
                    ))
                }
            </Box>
        </DrawerResponsive>
    )
}

export default AuthGuard(Profile);