import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "../api/axios"
import { Link } from "react-router-dom"
import Post from "../Components/posts/Post"

const Posts = () => {

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["readOnlyPost"],
        queryFn: getAllPosts,
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div className="posts-container">
            {posts.data.map(post => (
                <div className="post-info" key={post.id}>
                    <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
                    <p className="post-topic">{post.topic.title}</p>
                    <p className="post-author">Author: {post.author.user.first_name} {post.author.user.last_name}</p>
                </div>
            ))}
        </div>
    )
}

export default Posts