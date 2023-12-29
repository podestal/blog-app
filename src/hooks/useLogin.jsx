import useUser from "../hooks/useUser"
import { useMutation } from "@tanstack/react-query"
import { login, getUser } from "../api/axios"
import { useNavigate } from "react-router-dom"

const useLogin = () => {

    const {user, setUser} = useUser() 
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'

    const {mutate: getAuthorMutation} = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser({ 
                ...user,
                ...res.data.user,
                authorId: res.data.id,
                jobTitle: res.data.job_title,
                memberSince: res.data.member_since,
            })
            console.log("get author", user)
            navigate(from, {replace: true})

        },
        onError: err => console.log(err.message),
    })

    const { mutate: loginMutation } = useMutation({
        mutationFn: (data) => login(data),
        onSuccess: res => {
            window.localStorage.setItem("refreshToken", JSON.stringify(res.data.refresh))
            setUser({
                ...user, 
                refreshToken: res.data.refresh,
                accessToken: res.data.access,
            })
            console.log("login", user)
            getAuthorMutation({ accessToken: res.data.access })
        },
        onError: err => console.log(err.message),
    })

    return loginMutation

}

export default useLogin