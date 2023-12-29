import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createPost } from "../../api/axios"
import useUser from "../../hooks/useUser"
import Topics from "./Topics"

const PostForm = () => {

    const [title, setTitle] = useState("")
    const { user } = useUser()


    const {mutate: createPostMutation} = useMutation({
        mutationFn: data => createPost(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })


    const handleSubmit = e => {
        e.preventDefault()
        const topic = e.target.topics.value
        createPostMutation({ accessToken: user.accessToken, post: {title, topic} })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Topics />
                <button>Create Post</button>
            </form>
        </div>
    )
}

export default PostForm