import { useAppDispatch, useAppSelector } from "../hooks"
import { editNote } from "../store/editSlice"
import { Note as NoteType } from "../schemas/schemas"
import { NoteContent } from "./NoteContent"
import { NoteEdit } from "./NoteEdit"



export const Note: React.FC<NoteType> = (note: NoteType) => {
    const editState = useAppSelector(state => state.edit)
    const dispatch = useAppDispatch()

    return (
        <div className="note">
            {
                editState.editableNote.toString() === note._id
                    ? <NoteEdit {...note} />
                    : <NoteContent {...note} />
            }
        </div>
    )
}