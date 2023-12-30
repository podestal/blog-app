import { useEffect } from "react"
import useUser from "../hooks/useUser"

const Profile = () => {

    const {user} = useUser()

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Job Title: {user.jobTitle}</p>
            <p>Posts Written: {user.posts}</p>
            <p>Member Since: {user.memberSince}</p>
        </div>
    )
}

export default Profile