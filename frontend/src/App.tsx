import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from './hooks'
import { getNotes } from "./store/accountSlice"
import { SignForm } from "./components/SignForm"
import { Account } from "./components/Account"
import { PageNotFound } from "./components/PageNotFound"
import './App.scss' 


export const App = () => {
  const dispatch = useAppDispatch()
  let { isAuthenticated, error } = useAppSelector(state => state.account)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(getNotes(token))
      return navigate('/account')
    }
  }, [isAuthenticated])

  
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<SignForm/>}/>
        <Route path='/signup' element={<SignForm/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

