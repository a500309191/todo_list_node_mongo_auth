import { useAppDispatch, useAppSelector } from "../hooks"
import { editNote } from "../store/editSlice"
import { Note as NoteType } from "../schemas/schemas"
import { getNotes } from "../store/accountSlice"


export const NoteContent = ({body, _id: id}: NoteType) => {

    const editState = useAppSelector(state => state.edit)
    const dispatch = useAppDispatch()

    const deleteNote = (id: string) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`http://localhost:8080/notes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `${JSON.parse(token)}` },
            })
            .then(res => console.log("DELETE NOTE RESPONSE: ", res))
            .then(() => dispatch(getNotes(token)))
        } else {
            console.log("there is no token")
        }
    }

    return (
        <>
            <div className="note-body">{body}</div>
            <div
                className="note-edit"
                onClick={ () => dispatch(editNote(id)) }
            >T</div>
            <div
                className="note-delete"
                onClick={ () => deleteNote(id) }
            >X</div>
        </>
    )
}