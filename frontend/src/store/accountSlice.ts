import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit"
import type {
    Error, 
    Login,
    LoginRes,
    Note,
    Data,
    AccountState,
    CreateNote,
    User,
    CreateUser
} from "../schemas/schemas"



export const signIn = createAsyncThunk<LoginRes, Login, {rejectValue: any}>(
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
        const data = await response.json()

        if (!response.ok) return thunkAPI.rejectWithValue(data)

        return data
	}
)


export const signUp = createAsyncThunk<CreateUser, Login, {rejectValue: any}>(
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
        const data = await response.json()

        if (!response.ok) return thunkAPI.rejectWithValue(data)

        return data    
	}
)


export const getData = createAsyncThunk<Data, string, {rejectValue: string}>(
	"user/getData",
	async (token, thunkAPI) => {
        
        if (token) {
            const response = await fetch(
                "http://localhost:8080/data", 
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
    signUpSuccess: false,
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
        signOut(state) {
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
                state.isAuthenticated = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.name = action.payload.name
                state.signUpSuccess = true
                state.error = null
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.notes = action.payload.notes
                state.name  = action.payload.username
                state.isAuthenticated = true
                state.error = ""
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload.error
            })
    }
})


function isError(action: AnyAction) {
    return action.type.endsWith("rejected")
}

export const { setName, setPassword, signOut } = accountSlice.actions
export default accountSlice.reducer