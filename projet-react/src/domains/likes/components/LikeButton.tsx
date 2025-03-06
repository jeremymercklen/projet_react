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
    }, [likes])

    useEffect(() => { dispatch(getLikes()) }, [])

    return (
        <Fragment>
            <Box sx={{ display: 'flex' }}>
                <Typography>{likes.filter((like: Like) => like.tweetId === tweetId).length}</Typography>
                <Button onClick={() => {
                    isLiked ?
                        dispatch(deleteLike({ likes, tweetId })) :
                        dispatch(createLike(tweetId));
                    setIsLiked(!isLiked);
                }
                }>
                    {
                        isLiked ?
                            <FaHeart /> :
                            <FaRegHeart />
                    }
                </Button>
            </Box>
        </Fragment>
    )
}

export default LikeButton