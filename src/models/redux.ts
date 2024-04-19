export interface IUser {
    id: string
    name: string
    password: string
    isAuth: boolean
    avatar?: string
}

export interface IPost {
    text: string
    likes?: string
}

export interface LoadAvatarAction {
    user: IUser
    avatar: string
}