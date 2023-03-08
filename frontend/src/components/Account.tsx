import { useNavigate } from "react-router-dom";
import { NotesList } from "./NotesList"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getNotes } from "../store/accountSlice"
import { useEffect } from "react"


export const Account = () => {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.account)

    useEffect(() => {
        dispatch(getNotes())
      }, [dispatch])

    const navigate = useNavigate()
    useEffect(() => {
        if (!userState.isAuthenticated) {
            return navigate('/')
        }
    }, [userState.isAuthenticated])

    return (
        <div className="user-account">
            <NotesList />
        </div>
    )
}