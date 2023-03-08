import { Routes, Route, Link, NavLink, useLocation, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setName, setPassword } from "../store/accountSlice"
import { signIn } from "../store/accountSlice"
import { signUp } from "../store/accountSlice"


export const SignForm = () => {

    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.account.name)
    const password = useAppSelector(state => state.account.password)
    
    return (
        <div className="sign-form">
            <div
                className="sign-tumbler"
                style={{ backgroundPosition: `${location == "/signup" ? "left" : "right"}` }}
            >
                <Link to="/" className="log-button">LOGIN</Link>
                <Link to="/signup" className="reg-button">REGISTRATION</Link>
            </div>
            <input defaultValue={name} className="sign-name" onChange={e => dispatch(setName(e.target.value))} />
            <input type="password" defaultValue={password} className="sign-password" onChange={e => dispatch(setPassword(e.target.value))} />
            <div
                className="sign-button"
                onClick={() => {
                    location == "/signup"
                        ? dispatch(signUp({name, password}))
                        : dispatch(signIn({name, password}))
                    }
                }
            >
                {location == "/signup" ? "REGISTRATION" : "LOGIN"}
            </div>
        </div>
    )
}