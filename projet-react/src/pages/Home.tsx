import AuthGuard from '../domains/auth/AuthGuard';
import { Tweet } from '../domains/tweets/types';
import DarkModeButton from '../ui/DarkModeButton';
import DrawerResponsive from '../ui/DrawerResponsive';
import TweetItem from '../ui/TweetItem';
import CreateTweetModal from '../domains/tweets/components/CreateTweetModal';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getTweetsOrderByDate } from '../domains/tweets/slice';
import { useEffect } from 'react';

function Home() {
    const tweets: Tweet[] = useAppSelector((state: any) => state.tweets.tweets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTweetsOrderByDate());
    }, [])

    return (
        <DrawerResponsive>
            <DarkModeButton />
            {
                tweets.map((tweet: Tweet, index) => (
                    <TweetItem tweet={tweet} key={index} />
                ))
            }
            <CreateTweetModal />
        </DrawerResponsive>
    )
}

export default AuthGuard(Home);