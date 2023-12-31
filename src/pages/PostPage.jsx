import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPost, editPost } from "../api/axios"
import useUser from "../hooks/useUser"
import SectionForm from "../Components/posts/SectionForm"
import Sections from "../Components/posts/Sections"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Edition from "../Components/Edition"
import usePublish from "../hooks/userPublish"

const PostPage = () => {

    const {user} = useUser()
    const queryClient = useQueryClient()
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const navigate = useNavigate()
    // const {publish, setPublish} = usePublish(false)
    const [publish, setPublish] = useState(false)
    const [edit, setEdit] = useState(true)
    const [title, setTitle] = useState("")

    const { data: post, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost({id, accessToken: user.accessToken}),
    })

    // useEffect(() => {
    //     setTitle(post.data.title)
    //     setPublish(post.data.status == "C" ? true : false)
    // }, [post])


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


    const handleEdit = (title) => {
        editPostMutation({id, accessToken: user.accessToken, post: { title }})
        setEdit((prev) => !prev)
    }

    const handlePublish = () => {
        setPublish(true)
        editPostMutation({id, accessToken: user.accessToken, post: { status:"C" }})
        navigate('/')
    }

    const handleUnpublish = () => {
        setPublish(false)
        editPostMutation({id, accessToken: user.accessToken, post: { status:"P" }})
    }

    return (
        <div>
            <div className="post-header">
                <div className="title-container">
                    <h1>{post.data.title}</h1>
                </div>
                {!publish
                ?<button onClick={handlePublish} className="publish-button">Publish</button>
                :<button onClick={handleUnpublish} className="publish-button">Unpublish</button>
                }
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