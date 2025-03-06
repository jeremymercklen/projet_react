import { Box, Button, Card, Typography } from '@mui/material'
import { Tweet } from '../domains/tweets/types';
import React, { Fragment, useEffect, useState } from 'react'
import { getUserEmailById } from '../domains/auth/service';
import EditTweetModal from '../domains/tweets/components/EditTweetModal';
import DeleteTweetModal from '../domains/tweets/components/DeleteTweetModal';
import LikeButton from '../domains/likes/components/LikeButton';
import { isTweetToUser } from '../domains/tweets/service';
import { useNavigate } from 'react-router-dom';

interface TweetProps {
    tweet: Tweet
}

const TweetItem: React.FC<TweetProps> = ({ tweet }) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const getTweets = async () => {
            setUserEmail(await getUserEmailById(tweet.userId));
        }
        getTweets();
    }, []);

    const date = new Date(tweet.creationTime);
    return (
        <div>
            <Card sx={{ marginTop: 2, marginLeft: 1, marginRight: 1 }} variant='outlined'>
                <Box sx={{ marginLeft: 1, marginRight: 1 }}>
                    <Button variant='text' onClick={() => navigate(`/profile/${tweet.userId}`)} sx={{ textTransform: 'none' }}>{userEmail}</Button>
                    <Typography fontWeight={'bold'}>{tweet.content}</Typography>
                    <Typography fontSize={12}>{date.toLocaleDateString()}</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <LikeButton tweetId={tweet.id} />
                        {
                            isTweetToUser(tweet.userId) ?
                                <Fragment>
                                    <EditTweetModal tweet={tweet} />
                                    <DeleteTweetModal tweet={tweet} />
                                </Fragment> :
                                <Fragment />
                        }
                    </Box>
                </Box>
            </Card>
        </div>
    )
}

export default TweetItem