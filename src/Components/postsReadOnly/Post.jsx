import { getOnePost } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"
import Section from "./section"

const Post = (props) => {

    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const {data: post, isLoading, isError, error} = useQuery({
        queryKey: ["onePost"],
        queryFn: () => getOnePost({ id })
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            <h1>{post.data.title}</h1>
            {post.data.sections.map(section => (
                <Section 
                    key={section.id}
                    section={section}
                />
            ))}
        </div>
    )
}

export default Post