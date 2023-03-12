export type Error = {
    success: boolean
    error: string
}


export type Login = {
    name: string
    password: string
}


export type LoginResponse = {
    accessToken?: string
    success: boolean
    error: string
}


export type Note = {
    index?: number
    _id: string
    body: string
    isDone: boolean
    user: string
    createdAt: string
    updatedAt: string
}


export type Data = {
    username: string
    notes: Note[]
}


export type CreateUser = {
    name: string
    success: boolean
}


export type EditState = {
    editableNote: number
}


export type AccountState = {
    name: string
    password: string
    signUpSuccess: boolean
    isAuthenticated: boolean
    loading: boolean
    error: null | string
    notes: Note[]
}