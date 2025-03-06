import { Box, Button, Card, Typography, Divider } from '@mui/material';
import { Tweet } from '../domains/tweets/types';
import React, { Fragment, useEffect, useState } from 'react';
import { getUserEmailById } from '../domains/auth/service';
import EditTweetModal from '../domains/tweets/components/EditTweetModal';
import DeleteTweetModal from '../domains/tweets/components/DeleteTweetModal';
import LikeButton from '../domains/likes/components/LikeButton';
import { isTweetToUser } from '../domains/tweets/service';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Pour les icônes d'édition et de suppression

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
                padding: 1, // Padding ajusté pour mobile
            }
        }} variant='outlined'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* User Email Button */}
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

                {/* Tweet Content */}
                <Typography
                    sx={{ fontWeight: 'bold', marginTop: 1, color: 'text.primary', wordBreak: 'break-word' }}
                >
                    {tweet.content}
                </Typography>

                {/* Tweet Date */}
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                </Typography>

                <Divider sx={{ marginTop: 2 }} />

                {/* Actions: Like, Edit, Delete */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 1,
                    flexWrap: 'wrap', // Pour l'adaptabilité sur mobile
                }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Like Button */}
                        <LikeButton tweetId={tweet.id} />
                    </Box>

                    {/* Edit and Delete Buttons (only visible if the tweet belongs to the user) */}
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
