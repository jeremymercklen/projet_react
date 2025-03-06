import { Box, Button, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { getIfTweetIsLiked } from '../service'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../app/store'
import { createLike, deleteLike, getLikes } from '../slice'
import { Like } from '../types'

function LikeButton({ tweetId }: { tweetId: number }) {
    const likes = useSelector((state: any) => state.likes.likes);
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLiked(getIfTweetIsLiked(likes, tweetId))
    }, [likes]);

    useEffect(() => {
        dispatch(getLikes())
    }, [dispatch]);

    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.1)',
                }
            }}>
                {/* Nombre de likes */}
                <Typography sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'color 0.3s',
                    '&:hover': {
                        color: 'primary.main',
                    }
                }}>
                    {likes.filter((like: Like) => like.tweetId === tweetId).length}
                </Typography>

                {/* Bouton de like sans fond */}
                <Button
                    onClick={() => {
                        isLiked ? dispatch(deleteLike({ likes, tweetId })) : dispatch(createLike(tweetId));
                        setIsLiked(!isLiked);
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent', // Pas de fond
                        padding: 0.5,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // léger fond lors du survol
                        },
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    {isLiked ? (
                        <FaHeart style={{ color: '#FF4F4F', fontSize: '1.2rem' }} />
                    ) : (
                        <FaRegHeart style={{ color: '#657786', fontSize: '1.2rem' }} />
                    )}
                </Button>
            </Box>
        </Fragment>
    )
}

export default LikeButton;
