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
import { getNbFollowers, getNbFollowings, isSameUser } from '../domains/users/services';
import FollowButton from '../domains/users/components/FollowButton';
import FollowersModal from '../domains/users/components/FollowersModal';
import FollowingsModal from '../domains/users/components/FollowingsModal';

function Profile() {
    const tweets: Tweet[] = useAppSelector((state: any) => state.tweets.tweets);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [nbFollowers, setNbFollowers] = useState(0);
    const [nbFollowings, setNbFollowings] = useState(0);

    function incrementFollowers() {
        setNbFollowers(nbFollowers + 1);
    }

    function decrementFollowers() {
        setNbFollowers(nbFollowers - 1);
    }

    useEffect(() => {
        const getNb = async () => {
            setNbFollowers(await getNbFollowers(Number(id)));
            setNbFollowings(await getNbFollowings(Number(id)));
        }
        getNb();
    }, []);

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
                        <Fragment>
                            <FollowersModal />
                            <FollowingsModal />
                        </Fragment> :
                        <Fragment>
                            <FollowButton userId={Number(id)} incrementFollowers={incrementFollowers} decrementFollowers={decrementFollowers} />
                            <Typography>{`followers : ${nbFollowers}`}</Typography>
                            <Typography>{`followings: ${nbFollowings}`}</Typography>
                        </Fragment>
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