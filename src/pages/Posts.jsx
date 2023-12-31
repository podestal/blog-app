import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../api/axios"
import { Link } from "react-router-dom"

const Posts = () => {

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["readOnlyPost"],
        queryFn: getAllPosts,
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            {posts.data.map(post => <Link to={`${post.id}`} key={post.id}>{post.title}</Link>)}
        </div>
    )
}

export default Posts