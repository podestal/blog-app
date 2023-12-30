import { Link } from "react-router-dom"

const Post = ({ post }) => {
    return (
        <div>
            <Link to={`/post/${post.id}`}><h2>{post.title}</h2></Link>
            <p>{post.topic.title}</p>
        </div>
    )
}

export default Post


{/* <div key={post.id}>
<Link to={`/post/${post.id}`}>{post.title}</Link>
<p>{post.description}</p>
</div> */}