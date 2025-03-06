import { Button } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { createFollower, deleteFollower, isFollowing } from '../services'

function FollowButton({ userId, incrementFollowers, decrementFollowers }: { userId: number, incrementFollowers: () => void, decrementFollowers: () => void }) {
    const [isFollowingUser, setIsFollowingUser] = useState(false);

    useEffect(() => {
        const getIsFollowing = async () => {
            setIsFollowingUser(await isFollowing(userId));
        }
        getIsFollowing();
    }, []);

    return (
        <Fragment>
            {!isFollowingUser ?
                <Button variant='contained' onClick={() => {
                    setIsFollowingUser(!isFollowingUser);
                    createFollower(userId);
                    incrementFollowers();
                }}>Follow</Button> :
                <Button variant='outlined' onClick={() => {
                    setIsFollowingUser(!isFollowingUser);
                    deleteFollower(userId);
                    decrementFollowers();
                }}>Unfollow</Button>
            }
        </Fragment>
    )
}

export default FollowButton