export type Login = {
    name: string
    password: string
}

export type CreateNote = {
    body: string
}

export type UpdateNote = {
    body: string
    isDone: boolean
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
    selectedNote: null | number
    editableNote: null | number
}

export type AccountState = {
    name: string
    password: string
    isAuthenticated: boolean
    loading: boolean
    error: null | boolean
    notes: Note[]
}