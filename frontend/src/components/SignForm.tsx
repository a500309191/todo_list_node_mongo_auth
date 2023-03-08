import { Routes, Route, Link, NavLink, useLocation, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setName, setPassword } from "../store/accountSlice"
import { SignIn } from "../store/accountSlice"
import { SignUp } from "../store/accountSlice"


export const SignForm = () => {

    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const name = useAppSelector(state => state.account.name)
    const password = useAppSelector(state => state.account.password)
    
    return (
        <div className="sign-form">
            <div
                className="sign-tumbler"
                style={{ backgroundPosition: `${location == "/registration" ? "left" : "right"}` }}
            >
                <Link to="/" className="log-button">LOGIN</Link>
                <Link to="/registration" className="reg-button">REGISTRATION</Link>
            </div>
            <input defaultValue={name} className="sign-name" onChange={e => dispatch(setName(e.target.value))} />
            <input type="password" defaultValue={password} className="sign-password" onChange={e => dispatch(setPassword(e.target.value))} />
            <div
                className="sign-button"
                onClick={() => {
                    location == "/registration"
                        ? dispatch(SignUp({name, password}))
                        : dispatch(SignIn({name, password}))
                    }
                }
            >
                {location == "/registration" ? "REGISTRATION" : "LOGIN"}
            </div>
        </div>
    )
}