import { useNavigate } from "react-router-dom";
import { Settings } from "./Settings"
import { NotesList } from "./NotesList"
import { AddNote } from "./AddNote"
import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect } from "react"


export const Account = () => {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.account)

    const navigate = useNavigate()
    useEffect(() => {
        if (!userState.isAuthenticated) {
            return navigate('/')
        }
    }, [userState.isAuthenticated])

    return (
        <div className="account">
            <Settings />
            <NotesList />
            <AddNote />
        </div>
    )
}