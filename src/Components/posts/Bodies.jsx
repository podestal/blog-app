import { useQuery } from "@tanstack/react-query"
import { getBodies } from "../../api/axios"
import useUser from "../../hooks/useUser"
import Body from "./Body"

const Bodies = ({ section }) => {

    const { user } = useUser()
    const sectionId = section.id
    const {data: bodies, isLoading, isError, error } = useQuery({
        queryKey: ["bodies"],
        queryFn: () => getBodies({ postId: section.post, sectionId, accessToken: user.accessToken}),
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <>
            {bodies.data.filter(body => sectionId == body.section)
                .map(body => (
                    <Body 
                        key={body.id}
                        body={body}
                    />
                ))
            }
        </>
    )
}

export default Bodies