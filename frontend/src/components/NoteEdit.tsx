import { useState } from "react" 
import { useAppDispatch, useAppSelector } from "../hooks"
import { editNote } from "../store/editSlice"
import { getNotes } from "../store/accountSlice"
import { Note as NoteType } from "../schemas/schemas"


export const NoteEdit = ({body, _id: id}: NoteType) => {

    const editState = useAppSelector(state => state.edit)
    const dispatch = useAppDispatch()
    const [newBody, setNewBody] = useState("")

    
    const updateNote = (id: string) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`http://localhost:8080/notes/${id}`, {
                method: "PUT",
                body: JSON.stringify({ body: newBody }),
                headers: {
                    "Authorization": `${JSON.parse(token)}`,
                    "Content-Type": "application/json"
                },
            })
            .then(() => dispatch(getNotes(token)))
        } else {
            console.log("there is no token")
        }
    }

    return (
        <>
            <input
                className="note-body-edit"
                defaultValue={body}
                onChange={e => setNewBody(e.target.value)}
            />
            <div
                className={`${newBody.length >= 5 ? "note-save" : "note-save unactive"}`}
                onClick={ () => {
                    if (newBody.length >= 5) {
                        updateNote(id)
                        dispatch(editNote(0)) 
                    }
                }}
            >✔</div>
            <div
                className="note-cancel"
                onClick={ () => dispatch(editNote(0)) }
            >X</div>
        </>
    )
}