import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api/axios"
import PostForm from "../Components/posts/PostForm"
import Post from "../Components/posts/Post"
import { useEffect } from "react"

const Dashboard = () => {

    const {user, setUser} = useUser() 

    const {data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts({ accessToken: user.accessToken})
    })

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
            <h1>Dashboard</h1>
            <PostForm />
            {posts.data.map(post => <Post key={post.id} post={post}>{post.title}</Post>)}
        </div>
    )

}

export default Dashboard