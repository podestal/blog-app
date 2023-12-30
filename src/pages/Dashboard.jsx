import useUser from "../hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../api/axios"
import PostForm from "../Components/posts/PostForm"
import Post from "../Components/posts/Post"

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
            {posts.data.map(post => <Post key={post.id} post={post}>{post.title}</Post>)}
            {console.log(posts.data)}
        </div>
    )
}

export default Dashboard