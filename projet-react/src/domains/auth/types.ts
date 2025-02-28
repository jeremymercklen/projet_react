export type AuthResponse = {
    accessToken: string,
    email: string,
    id: number
}

export type AuthInput = {
    email: string,
    password: string,
    stayConnected: boolean
}