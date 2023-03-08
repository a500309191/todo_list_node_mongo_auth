import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks"
import { getNotes } from "../store/accountSlice"


export const AddNote = () => {

    const [body, setBody] = useState("")
    const dispatch = useAppDispatch()

    const addNote = () => {
        const req_body = JSON.stringify({ body })
        const token = localStorage.getItem('token')
        if (token) {
            fetch("http://localhost:8080/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${JSON.parse(token)}`
                },
                body: req_body
            })
            .then(res => console.log("ADD NOTE RESPONSE: ", res))
            .then(() => dispatch(getNotes(token)))
        } else {
            console.log("there is no token")
        }
    }


    return (
        <div className="add-note">
            <textarea
                maxLength={60} 
                minLength={10} 
                className="add-note-body"
                onChange={e => setBody(e.target.value)}
            ></textarea>
            <div
                className="add-note-button"
                onClick={() => addNote()}
            >ADD NOTE</div>
        </div>
    )
}