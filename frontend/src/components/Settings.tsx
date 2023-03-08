import { useAppDispatch, useAppSelector } from "../hooks"
import { editNote } from "../store/editSlice"
import { Note as NoteType } from "../schemas/schemas"
import { signOut } from "../store/accountSlice"
import { NoteContent } from "./NoteContent"
import { NoteEdit } from "./NoteEdit"


export const Settings = () => {

    const name = useAppSelector(state => state.account.name)
    const dispatch = useAppDispatch()

    return (
        <div className="settings">
            <div className="settings-username">username: {name}</div>
            <div
                className="settings-logout"
                onClick={() => dispatch(signOut())}
            >logout</div>
        </div>
    )   
}