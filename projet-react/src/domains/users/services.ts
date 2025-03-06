import { toast } from "react-toastify";
import { getIdWithToken, getToken } from "../auth/service";
import usersAPIInstance from "./api";
import { User } from "./types";

export function isSameUser(userId: number) {
    const currentUserId = getIdWithToken(getToken())
    return userId === currentUserId;
}

export async function createFollower(followedUserId: number) {
     const followingUserId = getIdWithToken(getToken());

     let followedUser: User = await usersAPIInstance.get(`/users/${followedUserId}`)
     let followingUser: User = await usersAPIInstance.get(`/users/${followingUserId}`)

     followedUser.followers = [...followedUser.followers, followingUserId];
     followingUser.followings = [...followingUser.followings, followedUserId];

     usersAPIInstance.patch(`/users/${followedUserId}`, {followers: followedUser.followers});
     usersAPIInstance.patch(`/users/${followingUserId}`, {followings: followingUser.followings});
}

export async function deleteFollower(followedUserId: number) {
    const followingUserId = getIdWithToken(getToken());
    
    let followedUser: User = await usersAPIInstance.get(`/users/${followedUserId}`)
    let followingUser: User = await usersAPIInstance.get(`/users/${followingUserId}`)

    followedUser.followers = followedUser.followers.filter((id) => id !== followingUserId);
    followingUser.followings = followingUser.followers.filter((id) => id !== followedUserId);

    usersAPIInstance.patch(`/users/${followedUserId}`, {followers: followedUser.followers});
    usersAPIInstance.patch(`/users/${followingUserId}`, {followings: followingUser.followings});
}

export async function isFollowing(followedUserId: number) {
    const followingUserId = getIdWithToken(getToken());
    const followingUser: User = await usersAPIInstance.get(`/users/${followingUserId}`);
    const id = followingUser.followings.find((id) => id === followedUserId);
    return Boolean(id);
}

export async function getFollowers() {
    const currentUserId = getIdWithToken(getToken());
    const user: User =  await usersAPIInstance.get(`/users/${currentUserId}`)
    return user.followers;
}

export async function getFollowings() {
    const currentUserId = getIdWithToken(getToken());
    const user: User =  await usersAPIInstance.get(`/users/${currentUserId}`)
    return user.followings;
}

export async function getNbFollowers(userId: number) {
    const currentUserId = getIdWithToken(getToken());
    const user: User =  await usersAPIInstance.get(`/users/${userId}`)
    return user.followers.length;
}

export async function getNbFollowings(userId: number) {
    const user: User =  await usersAPIInstance.get(`/users/${userId}`)
    return user.followings.length;
}

usersAPIInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    toast.error(error.response.data);
    throw error;
});
