import { Box, Button, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { createLikeInAPI, deleteLikeInAPI, getIfTweetIsLiked } from '../service'
import { getIdWithToken, getToken } from '../../auth/service'
import { Tweet } from '../../tweets/types'

function LikeButton({ tweet }: { tweet: Tweet }) {
    const [isLiked, setIsLiked] = useState(false);
    const [tweetState, setTweetState] = useState(tweet)



    useEffect(() => {
        console.log('effect', tweetState)
        setIsLiked(getIfTweetIsLiked(tweetState.likes, tweetState.id))
    }, [tweetState]);

    useEffect(() => {
        setTweetState(tweet)
    }, [tweet]);

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
                <Typography sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'color 0.3s',
                    '&:hover': {
                        color: 'primary.main',
                    }
                }}>
                    {tweetState.likes.length}
                </Typography>

                <Button
                    onClick={async () => {
                        if (isLiked) {
                            await deleteLikeInAPI(tweetState.likes)
                            setTweetState({
                                ...tweetState,
                                likes: tweetState.likes.filter(l => l.userId !== getIdWithToken(getToken()))
                            })
                        } else {
                            const newLike = await createLikeInAPI(tweetState, getIdWithToken(getToken()))
                            if (newLike) {
                                setTweetState({
                                    ...tweetState,
                                    likes: [...tweetState.likes, newLike]
                                })
                            }
                        }
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        padding: 0.5,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
