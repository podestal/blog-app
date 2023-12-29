import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useMutation } from "@tanstack/react-query"
import { getToken, getUser } from "../api/axios"

const PersistLogin = () => {

    const [loading, setLoading] = useState(true)
    const {user, setUser} = useUser()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'
    let accessToken = ""

    const {mutate: getAuthorMutation} = useMutation({
        mutationFn: data => getUser(data),
        onSuccess: res => {
            setUser({ 
                ...user,
                ...res.data.user,
                authorId: res.data.id,
                jobTitle: res.data.job_title,
                memberSince: res.data.member_since,
                accessToken
            })

            navigate(from)
        },
        onError: err => console.log(err.message),
    })
    
    const { mutate: authMutation } = useMutation({
        mutationFn: data => getToken(data),
        onSuccess: res => {
            accessToken = res.data.access
            getAuthorMutation({ accessToken: res.data.access })
        },
        onError: err => console.log(err),
    })

    useEffect(() => {
        const refreshToken = JSON.parse(window.localStorage.getItem("refreshToken"))
        !user ? authMutation({ refresh: refreshToken }) : setLoading(false)
    }, [user])

    return (
        <div>
            {loading 
                ? <p>Loading ...</p>
                : <Outlet />
            }
        </div>
    )
}

export default PersistLogin