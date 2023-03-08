import { createSlice } from "@reduxjs/toolkit"
import type { EditState } from "../schemas/schemas"


const initialState: EditState = { editableNote: 0 }

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editNote(state, action) {
            state.editableNote = action.payload
        }
    },
})


export const { editNote } = editSlice.actions
export default editSlice.reducer

