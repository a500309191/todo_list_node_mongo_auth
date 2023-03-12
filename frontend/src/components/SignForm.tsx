import { Routes, Route, Link, NavLink, useLocation, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setName, setPassword } from "../store/accountSlice"
import { signIn } from "../store/accountSlice"
import { signUp } from "../store/accountSlice"


export const SignForm = () => {

    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const { name, password, error, signUpSuccess } = useAppSelector(state => state.account)
    
    return (
        <div className="sign-form">
            <div
                className="sign-tumbler"
                style={{ backgroundPosition: `${location == "/signup" ? "left" : "right"}` }}
            >
                <Link to="/" className="log-button">SIGNIN</Link>
                <Link to="/signup" className="reg-button">SIGNUP</Link>
            </div>
            <input
                className="sign-name"
                placeholder="username"
                defaultValue={name}
                onChange={e => dispatch(setName(e.target.value))} 
            />
            <input
                className="sign-password"
                placeholder="password (at least 6 characters)"
                type="password"
                defaultValue={password}
                onChange={e => dispatch(setPassword(e.target.value))}
            />
            <div
                className={`${name && password.length >= 6 ? "sign-button" : "sign-button unactive"}`}
                onClick={() => {
                    if (name && password) {
                        location == "/signup"
                            ? dispatch(signUp({name, password}))
                            : dispatch(signIn({name, password}))
                    }
                }}
            >
                ENTER
            </div>
            {error && <div className="error">{error.toUpperCase()}</div>}
            {signUpSuccess && <div className="success">USER {name} HAS BEEN REGISTERED</div>}
        </div>
    )
}