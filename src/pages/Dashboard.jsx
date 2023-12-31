import useUser from "../hooks/useUser"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getPosts } from "../api/axios"
import PostForm from "../Components/posts/PostForm"
import Post from "../Components/posts/Post"
import { useEffect } from "react"

const Dashboard = () => {

    const {user, setUser} = useUser() 
    const queryClient = useQueryClient()

    const {data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts({ accessToken: user.accessToken})
    })

    useEffect(() => {
        queryClient.invalidateQueries(["post"])
    }, [])

    useEffect(() => {
        if (posts) {
            const getLength = async () => {
                const length = await posts.data.length
                setUser({ ...user, posts: length })
            }
            getLength()
        }
    }, [posts])

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <PostForm />
            <div className="posts-container">
                {posts.data.map(post => <Post key={post.id} post={post}>{post.title}</Post>)}
            </div>
        </div>
    )

}

export default Dashboard