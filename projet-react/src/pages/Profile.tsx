import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DrawerResponsive from '../ui/DrawerResponsive';
import { getUserEmailById } from '../domains/auth/service';
import { Typography, Divider, Grid } from '@mui/material';
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
    }, [dispatch, id]);

    return (
        <DrawerResponsive>
            <DarkModeButton />
            <Box sx={{
                margin: 3,
                padding: 3,
                backgroundColor: 'background.paper',
                borderRadius: '15px',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
                    gap: 2,
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, textAlign: { xs: 'center', sm: 'left' } }}>{email}</Typography>
                    {isSameUser(Number(id)) ? (
                        <Fragment>
                            <FollowersModal />
                            <FollowingsModal />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <FollowButton
                                userId={Number(id)}
                                incrementFollowers={incrementFollowers}
                                decrementFollowers={decrementFollowers}
                            />
                        </Fragment>
                    )}
                </Box>

                <Divider sx={{ width: '100%', margin: '10px 0' }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout for followers/following
                    gap: 2,
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: { xs: 'center', sm: 'left' } }}>
                        {`Followers: ${nbFollowers}`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: { xs: 'center', sm: 'left' } }}>
                        {`Following: ${nbFollowings}`}
                    </Typography>
                </Box>

                <Divider sx={{ width: '100%', margin: '20px 0' }} />

                <Grid container spacing={3}>
                    {tweets.filter((tweet) => tweet.userId === Number(id)).map((tweet, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <TweetItem tweet={tweet} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </DrawerResponsive>
    );
}

export default AuthGuard(Profile);
