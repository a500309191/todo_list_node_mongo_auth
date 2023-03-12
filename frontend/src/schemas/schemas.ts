export type Error = {
    success: false
    error: string
}

export type Login = {
    name: string
    password: string
}

export type LoginRes = {
    accessToken?: string
    success: boolean
    error: string
}

export type CreateNote = {
    body: string
}

export type UpdateNote = {
    token: string
    id: string
}

export type UpdateNoteRes = {
    body: string
    success: boolean
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

export type User = {
    name: string
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