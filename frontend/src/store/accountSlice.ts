import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit"
import type {  Login, Note, Notes, AccountState, CreateNote, UpdateNote, User, CreateUser } from "../schemas/schemas"



export const SignIn = createAsyncThunk<string, Login, {rejectValue: string}>(
    "note/SignIn",
	async (body, thunkAPI) => {
        const response = await fetch("http://localhost:8080/user/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        console.log("DATA: ", data)
        return data.accessToken
	}
)


export const SignUp = createAsyncThunk<CreateUser, Login, {rejectValue: string}>(
    "user/SignUp",
	async (body, thunkAPI) => {
        const response = await fetch("http://localhost:8080/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        return data
	}
)


export const getNotes = createAsyncThunk<Notes, void, {rejectValue: string}>(
	"user/getNotes",
	async (_, thunkAPI) => {
        console.log("getNotes")
        const token = localStorage.getItem("token")
        
        if (token) {
            const response = await fetch("http://localhost:8080/notes", {
                method: "GET",
                headers: {"Authorization": `${JSON.parse(token)}`}
            });
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue("something went wrong")
            }

            const data = await response.json()
            console.log("DATA: ", data)
            return data

        } else {
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)



const initialState: AccountState = {
    name: "",
    password: "",
    isAuthenticated: false,
    loading: true,
    error: null,
    notes: [],
}


const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        logOut(state) {
            localStorage.removeItem("token")
            state.isAuthenticated = false
            state.notes = []
            state.password = ""
            state.name = ""
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SignIn.fulfilled, (state, action) => {
                console.log("PAYLOAD: ", action.payload)
                localStorage.setItem("token", JSON.stringify(action.payload))
                state.isAuthenticated = true
            })
            .addCase(SignUp.fulfilled, (state, action) => {
                state.name = action.payload.name
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload.notes
                console.log(state.notes)
            })
    }
})


export const { setName, setPassword, logOut } = accountSlice.actions
export default accountSlice.reducer