import EditContext from "../context/EditProvider"
import { useContext } from "react"

const useEdit = () => {
    return useContext(EditContext)
}

export default useEdit