import useUser from "../hooks/useUser"
import { Outlet, Navigate } from "react-router-dom"

const RequireAuth = () => {
    const {user} = useUser()

    return (
        user
            ? <Outlet />
            : <Navigate to={'/login'}/>
    )
}

export default RequireAuth