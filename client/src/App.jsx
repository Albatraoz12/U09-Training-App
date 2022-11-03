import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import Errorpage from './pages/Errorpage'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import ExercisePage from './pages/ExercisePage'
import UserListPage from './pages/UserListPage'
import AdminCreateUser from './pages/Admin/AdminCreateUser'
import FindUsers from './pages/Admin/FindUsers'
import UserPage from './pages/Admin/UserPage'

function App() {
    return (
        <div className="App">
            <Navbar />
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
            <Footer />
        </div>
    )
}

export default App
