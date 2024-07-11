/* eslint-disable react/prop-types */
import React, { createContext, useState, useMemo } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    // Memoize the context value to avoid unnecessary re-renders
    const value = useMemo(() => ({ user, setUser }), [user, setUser])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
