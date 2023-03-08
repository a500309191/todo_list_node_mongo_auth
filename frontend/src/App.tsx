import { useState, useEffect } from "react"
import { Routes, Route, redirect, useLocation, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from './hooks'
import { getNotes } from "./store/accountSlice"
import { NotesList } from "./components/NotesList"
import { SignForm } from "./components/SignForm"
import { Account } from "./components/Account"
import { PageNotFound } from "./components/PageNotFound"
import './App.scss' 


export const App = () => {
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.account)

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  const navigate = useNavigate()
  useEffect(() => {
    if (userState.isAuthenticated) {
      return navigate('/account')
    }
  }, [userState.isAuthenticated])

  console.log("isAuthenticated: ", userState.isAuthenticated)

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<SignForm/>}/>
        <Route path='/registration' element={<SignForm/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

