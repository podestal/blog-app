import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createPost } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import useUser from "../../hooks/useUser"
import Topics from "./Topics"

const PostForm = () => {

    const [title, setTitle] = useState("")
    const { user } = useUser()
    const uuid = uuidv4()
    const navigate = useNavigate()

    const {mutate: createPostMutation} = useMutation({
        mutationFn: data => createPost(data),
        onSuccess: res => navigate(`/post/${res.data.id}`),
        onError: err => console.log(err)
    })


    const handleSubmit = (topic) => {
        createPostMutation({ accessToken: user.accessToken, post: {id: uuid, title, topic: topic.id} })
    }

    return (
        <div className="post-form">
            <input 
                className="create-post-input"
                type="text" 
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Topics 
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default PostForm