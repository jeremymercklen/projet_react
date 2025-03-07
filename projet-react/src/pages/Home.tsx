import AuthGuard from '../domains/auth/AuthGuard';
import { Filter, Tweet } from '../domains/tweets/types';
import DarkModeButton from '../ui/DarkModeButton';
import DrawerResponsive from '../ui/DrawerResponsive';
import TweetItem from '../ui/TweetItem';
import CreateTweetModal from '../domains/tweets/components/CreateTweetModal';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getTweetsOrderByDate } from '../domains/tweets/slice';
import { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { handleFilterSelect } from '../domains/tweets/service';
import { getFollowings } from '../domains/users/services';
import { getIdWithToken, getToken } from '../domains/auth/service';



function Home() {
    const tweets: Tweet[] = useAppSelector((state: any) => state.tweets.tweets);
    const dispatch = useAppDispatch();
    const [followings, setFollowings] = useState([] as number[])
    const [filteredTweets, setFilteredTweets] = useState([] as Tweet[])

    useEffect(() => {
        const getAllFollowings = async () => {
            setFollowings(await getFollowings(getIdWithToken(getToken())));
        };
        dispatch(getTweetsOrderByDate());
        getAllFollowings();
    }, [])

    useEffect(() => {
        setFilteredTweets(tweets);
    }, [tweets])

    return (
        <DrawerResponsive>
            <DarkModeButton />
            <Select sx={{ m: 1 }} displayEmpty defaultValue={Filter.recent} onChange={(e) => setFilteredTweets(handleFilterSelect(e.target.value as Filter, followings, tweets))}>
                <MenuItem value={Filter.recent}>Recent</MenuItem>
                <MenuItem value={Filter.trending}>Trending</MenuItem>
                <MenuItem value={Filter.following}>Following</MenuItem>
            </Select>
            {
                filteredTweets.map((tweet: Tweet, index) => (
                    <TweetItem tweet={tweet} key={index} />
                ))
            }
            <CreateTweetModal />
        </DrawerResponsive>
    )
}

export default AuthGuard(Home);