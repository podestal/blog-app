import { useQuery } from "@tanstack/react-query"
import { getPost } from "../../api/axios"
import useUser from "../../hooks/useUser"

const Post = () => {

    const {user} = useUser()
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]

    const { data: res, isLoading, isError, error } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost({id, accessToken: user.accessToken}),
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error}</p>

    return (
        <div>
            <h1>{res.data.title}</h1>
            <p>{console.log(res)}</p>
        </div>
    )
}

export default Post