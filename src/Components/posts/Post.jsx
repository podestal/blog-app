import { Link } from "react-router-dom"
import { deletePost, editPost } from "../../api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUser from "../../hooks/useUser"
import EditPost from "./EditPost"
import { useState } from "react"

const Post = ({ post }) => {

    const {user} = useUser()
    const queryClient = useQueryClient()
    const [edit, setEdit] = useState(false)

    const {mutate: deletePostMutation} = useMutation({
        mutationFn: (data) => deletePost(data),
        onSuccess: () => queryClient.invalidateQueries(["post"]),
        onError: err => console.log(err)
    })

    const {mutate: editPostMutation} = useMutation({
        mutationFn: data => editPost(data),
        onSuccess: () => queryClient.invalidateQueries(["post"]),
        onError: err => console.log(err)
    })

    const handleEdit = (topic, title) => {
        console.log({ id: post.id, accessToken: user.accessToken, post: {topic, title} });

        editPostMutation({ id: post.id, accessToken: user.accessToken, post: {topic ,title} })
    }

    const handleDelete = () => {
        console.log("deleted")
        deletePostMutation({ id: post.id, accessToken: user.accessToken })
    }

    return (
        <div className="post-info">
            <EditPost 
                post={post}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default Post

