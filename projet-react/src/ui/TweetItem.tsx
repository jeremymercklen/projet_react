import { Box, Button, Card, Typography } from '@mui/material'
import { Tweet } from '../domains/tweets/types';
import React, { useEffect, useState } from 'react'
import { getUserEmailById } from '../domains/auth/service';
import { FaEdit, FaHeart, FaTrash } from 'react-icons/fa';
import EditTweetModal from '../domains/tweets/components/EditTweetModal';
import DeleteTweetModal from '../domains/tweets/components/DeleteTweetModal';

interface TweetProps {
    tweet: Tweet
}

const TweetItem: React.FC<TweetProps> = ({ tweet }) => {
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const getTweets = async () => {
            setUserEmail(await getUserEmailById(tweet.userId));
        }
        getTweets();
    }, []);

    const date = new Date(tweet.creationTime);
    console.log();


    return (
        <div>
            <Card sx={{ marginTop: 2, marginLeft: 1, marginRight: 1 }} variant='outlined'>
                <Box sx={{ marginLeft: 1, marginRight: 1 }}>
                    <Typography>{userEmail}</Typography>
                    <Typography fontWeight={'bold'}>{tweet.content}</Typography>
                    <Typography fontSize={12}>{date.toLocaleDateString()}</Typography>
                    <Button><FaHeart /></Button>
                    <EditTweetModal tweet={tweet} />
                    <DeleteTweetModal tweet={tweet} />
                </Box>
            </Card>
        </div>
    )
}

export default TweetItem