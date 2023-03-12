import { useState } from "react";
import { text } from "stream/consumers";
import { useAppSelector, useAppDispatch } from "../hooks"
import { getData } from "../store/accountSlice"


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
            .then(() => dispatch(getData(token)))
        } else {
            console.log("there is no token")
        }
    }

    const textarea: HTMLTextAreaElement | null = document.querySelector(".add-note-body")

    return (
        <div className="add-note">
            <textarea
                className="add-note-body"
                placeholder="Add new note (5 characters minimum and 50 maximum)"
                maxLength={50} 
                minLength={5} 
                onChange={e => setBody(e.target.value)}
            ></textarea>
            <div
                className={`${body.length >= 5 ? "add-note-button" : "add-note-button unactive"}`}
                onClick={() => { 
                    if (body.length >= 5) {
                        addNote()
                        setBody("")
                        if (textarea !== null) {
                            textarea.value = ""
                        }
                    }
                }}
            >ADD NOTE</div>
        </div>
    )
}