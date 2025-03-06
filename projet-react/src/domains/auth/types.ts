export type AuthLoginResponse = {
    accessToken: string,
    email: string,
    followers: number[],
    followings: number[],
    id: number
}

export type AuthSignupResponse = {
    accessToken: string,
    user: User
}

export type User = {
    email: string,
    id: number
}

export type AuthInput = {
    email: string,
    password: string,
    stayConnected: boolean
}
