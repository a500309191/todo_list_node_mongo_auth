import { createSlice } from "@reduxjs/toolkit"
import type { EditState } from "../schemas/schemas"


const initialState: EditState = {
    selectedNote: null,
    editableNote: null,
}

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editNote(state, action) {
            state.editableNote = action.payload
        },
        selectNote(state, action) {
            if (state.selectedNote === action.payload) {
                state.selectedNote = null
            } else {
                state.selectedNote = action.payload
            }
        }
    },
})


export const { editNote, selectNote } = editSlice.actions
export default editSlice.reducer

