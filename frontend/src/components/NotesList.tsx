import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect } from "react"
import { Note } from "./Note"
import { Note as NoteType } from "../schemas/schemas"

export const NotesList = () => {

    const notes = useAppSelector(state => state.account.notes)

    return (
        <div className="notes">
            {notes.map((note: NoteType) => <Note {...note} key={note._id}/>)}
        </div>
    )
}