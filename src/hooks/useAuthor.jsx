import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getUser } from "../api/axios"
import useUser from "./useUser"

const useAuthor = () => {

    console.log("useAuthor called");
    const {user, setUser} = useUser()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'

    const {mutate: getAuthorMutation} = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser({ 
                // ...user.accessToken,
                ...res.data.user,
                authorId: res.data.id,
                jobTitle: res.data.job_title,
                memberSince: res.data.member_since,
            })

            navigate(from)
        },
        onError: err => console.log(err.message),
    })

    return getAuthorMutation
}

export default useAuthor