import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPost, editPost } from "../api/axios"
import useUser from "../hooks/useUser"
import SectionForm from "../Components/posts/SectionForm"
import Sections from "../Components/posts/Sections"
import { useEffect, useState } from "react"

const PostPage = () => {

    const {user} = useUser()
    const queryClient = useQueryClient()
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const [edit, setEdit] = useState(false)

    const { data: post, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost({id, accessToken: user.accessToken}),
    })

    const [title, setTitle] = useState("") 

    const {mutate: editPostMutation} = useMutation({
        mutationFn: data => editPost(data),
        onSuccess: () => queryClient.invalidateQueries(["post"]),
        onError: err => console.log(err)
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error}</p>

    const handleEdit = () => {
        editPostMutation({id, accessToken: user.accessToken, post: { title }})
        setEdit((prev) => !prev)
    }

    return (
        <div>
            <div>
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