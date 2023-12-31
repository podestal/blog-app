import PublishContext from "../context/PublishProvider"
import { useContext } from "react"

const usePublish = () => {
    return useContext(PublishContext)
}

export default usePublish