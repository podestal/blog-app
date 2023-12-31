import { useState, createContext } from "react"

const PublishContext = createContext()

export const PublishProvider = ({ children }) => {
    const [publish, setPublish] = useState()

    return (
        <PublishContext.Provider value={{ publish, setPublish }}>
            {children}
        </PublishContext.Provider>
    )
}

export default PublishContext