import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import Errorpage from './components/Errorpage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ExercisePage from './components/ExercisePage'
import UserListPage from './components/UserListPage'
import AdminCreateUser from './components/AdminCreateUser'
import FindUsers from './components/FindUsers'
import UserPage from './components/UserPage'

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
