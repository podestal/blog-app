import { useEffect } from "react"
import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api/axios"

const Dashboard = () => {

    const {user} = useUser() 

    const {data: posts, isLoading, isError, error} = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts({ accessToken: user.accessToken})
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            <h1>Dashboard</h1>
            {posts.data.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
    )
}

export default Dashboard