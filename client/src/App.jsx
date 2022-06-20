import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import Errorpage from './components/Errorpage'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<Errorpage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
