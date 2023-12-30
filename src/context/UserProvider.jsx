import { createContext, useState } from "react"

const UserContext = createContext({})

export const UserProvider = ({ children}) => {
    const [user, setUser] = useState()
    const [edit, setEdit] = useState()

    return (
        <UserContext.Provider value={{ user, setUser, edit, setEdit }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext