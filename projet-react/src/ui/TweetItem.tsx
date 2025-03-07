import { Box, Button, Card, Typography, Divider } from '@mui/material';
import { Tweet } from '../domains/tweets/types';
import React, { useEffect, useState } from 'react';
import { getUserEmailById } from '../domains/auth/service';
import EditTweetModal from '../domains/tweets/components/EditTweetModal';
import DeleteTweetModal from '../domains/tweets/components/DeleteTweetModal';
import LikeButton from '../domains/likes/components/LikeButton';
import { isTweetToUser } from '../domains/tweets/service';
import { useNavigate } from 'react-router-dom';

interface TweetProps {
    tweet: Tweet;
}

const TweetItem: React.FC<TweetProps> = ({ tweet }) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const getTweets = async () => {
            setUserEmail(await getUserEmailById(tweet.userId));
        };
        getTweets();
    }, [tweet.userId]);

    const date = new Date(tweet.creationTime);

    return (
        <Card sx={{
            marginTop: 2,
            marginLeft: 1,
            marginRight: 1,
            padding: 2,
            borderRadius: 2,
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'background.paper',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.15)',
            },
            '@media (max-width: 600px)': {
                padding: 1,
            }
        }} variant='outlined'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    variant='text'
                    onClick={() => navigate(`/profile/${tweet.userId}`)}
                    sx={{
                        textTransform: 'none',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        '&:hover': { color: 'primary.dark' },
                    }}
                >
                    {userEmail}
                </Button>

                <Typography
                    sx={{ fontWeight: 'bold', marginTop: 1, color: 'text.primary', wordBreak: 'break-word' }}
                >
                    {tweet.content}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                </Typography>

                <Divider sx={{ marginTop: 2 }} />

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 1,
                    flexWrap: 'wrap',
                }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <LikeButton tweet={tweet} />
                    </Box>

                    {
                        isTweetToUser(tweet.userId) && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <EditTweetModal tweet={tweet} />
                                <DeleteTweetModal tweet={tweet} />
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Card>
    );
};

export default TweetItem;
