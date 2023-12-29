import { useEffect } from "react"
import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api/axios"
import { Link } from "react-router-dom"
import PostForm from "../Components/posts/PostForm"

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
            <PostForm />
            {posts.data.map(post => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                    <p>{post.description}</p>
                </div>
            ))}
            {console.log(posts.data)}
        </div>
    )
}

export default Dashboard