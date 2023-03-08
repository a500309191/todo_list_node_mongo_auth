export type Login = {
    name: string
    password: string
}

export type LoginRes = {
    accessToken: string
    name: string
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
    _id: string
    body: string
    isDone: boolean
    user: string
    createdAt: string
    updatedAt: string
}

export type Notes = {
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
    isAuthenticated: boolean
    loading: boolean
    error: null | boolean
    notes: Note[]
}