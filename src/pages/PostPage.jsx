import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPost, editPost } from "../api/axios"
import useUser from "../hooks/useUser"
import SectionForm from "../Components/posts/SectionForm"
import Sections from "../Components/posts/Sections"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PostPage = () => {

    const {user} = useUser()
    const queryClient = useQueryClient()
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    const { data: post, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost({id, accessToken: user.accessToken}),
    })

    const [title, setTitle] = useState("") 

    const {mutate: editPostMutation} = useMutation({
        mutationFn: data => editPost(data),
        onSuccess: res => {
            queryClient.invalidateQueries(["post"])
            console.log(res)
        },
        onError: err => console.log(err)
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error}</p>

    const handleEdit = () => {
        editPostMutation({id, accessToken: user.accessToken, post: { title }})
        setEdit((prev) => !prev)
    }

    const handlePublish = () => {
        editPostMutation({id, accessToken: user.accessToken, post: { status: "C" }})
        navigate('/')
    }

    return (
        <div>
            <div className="post-header">
                {edit 
                ? 
                <div>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e => setTitle(e.target.value))}
                    />
                    <button onClick={handleEdit}>Save</button>
                </div>
                :
                <div className="edit-title">
                    <h1>{post.data.title}</h1>
                    <button onClick={() => setEdit(prev => !prev)}>Edit</button>    
                </div>}
                <button onClick={handlePublish} className="publish-button">Publish</button>
            </div>
            <Sections 
                id={id}
                user={user}
            />
            <SectionForm 
                id={id}
                user={user}
            />
        </div>
    )
}

export default PostPage