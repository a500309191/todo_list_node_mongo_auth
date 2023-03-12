import { useAppDispatch, useAppSelector } from "../hooks"
import { signOut } from "../store/accountSlice"


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