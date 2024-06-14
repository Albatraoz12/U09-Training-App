import React, { Suspense, lazy } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'

const Home = lazy(() => import('./pages/Home'))
const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Search = lazy(() => import('./pages/Search'))
const Errorpage = lazy(() => import('./pages/Errorpage'))
const ExercisePage = lazy(() => import('./pages/ExercisePage'))
const UserListPage = lazy(() => import('./pages/UserListPage'))
const AdminCreateUser = lazy(() => import('./pages/Admin/AdminCreateUser'))
const FindUsers = lazy(() => import('./pages/Admin/FindUsers'))
const UserPage = lazy(() => import('./pages/Admin/UserPage'))

function App() {
    return (
        <div className="App">
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/userList/:name/:id" element={<UserListPage />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/exercise/:id" element={<ExercisePage />} />
                    <Route path="/createUser" element={<AdminCreateUser />} />
                    <Route path="/findUsers" element={<FindUsers />} />
                    <Route path="/getUser/:id" element={<UserPage />} />
                    <Route path="*" element={<Errorpage />} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    )
}

export default App
