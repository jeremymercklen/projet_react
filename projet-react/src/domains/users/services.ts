import { toast } from "react-toastify";
import { getIdWithToken } from "../auth/service";
import usersAPIInstance from "./api";
import { User } from "./types";

export function isSameUser(userId: number) {
    const currentUserId = getIdWithToken(localStorage.getItem('accessToken')!)
    return userId === currentUserId;
}

export async function createFollower(followedUserId: number) {
     const followingUserId = getIdWithToken(localStorage.getItem("accessToken")!);

     let followedUser: User = await usersAPIInstance.get(`/users/${followedUserId}`)
     let followingUser: User = await usersAPIInstance.get(`/users/${followingUserId}`)

     followedUser.followers = [...followedUser.followers, followingUserId];
     followingUser.followings = [...followingUser.followings, followedUserId];

     usersAPIInstance.patch(`/users/${followedUserId}`, {followers: followedUser.followers});
     usersAPIInstance.patch(`/users/${followingUserId}`, {followings: followingUser.followings})
}

export async function deleteFollower(followedUserId: number) {
    const followingUserId = getIdWithToken(localStorage.getItem("accessToken")!);
    
    let followedUser: User = await usersAPIInstance.get(`/users/${followedUserId}`)
    let followingUser: User = await usersAPIInstance.get(`/users/${followingUserId}`)

    followedUser.followers = followedUser.followers.filter((id) => id !== followingUserId);
    followingUser.followings = followingUser.followers.filter((id) => id !== followedUserId);

    usersAPIInstance.patch(`/users/${followedUserId}`, {followers: followedUser.followers});
    usersAPIInstance.patch(`/users/${followingUserId}`, {followings: followingUser.followings})
}

usersAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.response.data);
    throw error;
});