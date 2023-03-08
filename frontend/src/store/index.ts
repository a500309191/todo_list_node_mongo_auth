import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./editSlice"
import accountReducer from "./accountSlice"


const store = configureStore({
    reducer: {
        edit: taskReducer,
        account: accountReducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
