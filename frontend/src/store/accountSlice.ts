import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit"
import type { 
    Login,
    LoginRes,
    Note,
    Notes,
    AccountState,
    CreateNote,
    User,
    CreateUser
} from "../schemas/schemas"



export const signIn = createAsyncThunk<LoginRes, Login, {rejectValue: string}>(
    "note/signIn",
	async (body, thunkAPI) => {
        const response = await fetch(
            "http://localhost:8080/user/signin",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        return data
	}
)


export const signOut = createAsyncThunk<void, void, {rejectValue: string}>(
    "note/signOut",
	async (_, thunkAPI) => {
        const token = localStorage.getItem("token")
        if (token) {
            const response = await fetch(
                "http://localhost:8080/user/signout",
                { 
                    method: "DELETE",
                    headers: { "Authorization": `${JSON.parse(token)}` }
                }
            )
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue("something went wrong")
            }

            localStorage.removeItem("token")
            const data = await response.json()
            return data

        } else {
            return thunkAPI.rejectWithValue("something went wrong")
        }
	}
)


export const signUp = createAsyncThunk<CreateUser, Login, {rejectValue: string}>(
    "user/signUp",
	async (body, thunkAPI) => {
        const response = await fetch(
            "http://localhost:8080/user/signup", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        return data
	}
)


export const getNotes = createAsyncThunk<Notes, string, {rejectValue: string}>(
	"user/getNotes",
	async (token, thunkAPI) => {
        
        if (token) {
            const response = await fetch(
                "http://localhost:8080/notes", 
                {
                    method: "GET",
                    headers: {"Authorization": `${JSON.parse(token)}`}
                }
            )
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue("something went wrong")
            }
            
            const data = await response.json()
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
            .addCase(signIn.fulfilled, (state, action) => {
                localStorage.setItem("token", JSON.stringify(action.payload.accessToken))
                state.name = action.payload.name
                state.isAuthenticated = true
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.isAuthenticated = false
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.name = action.payload.name
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload.notes
                state.isAuthenticated = true
            })
    }
})


export const { setName, setPassword, logOut } = accountSlice.actions
export default accountSlice.reducer