import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBodies } from "../../api/axios"
import useUser from "../../hooks/useUser"
import Body from "./Body"
import { useEffect, useState } from "react"

const Bodies = ({ section }) => {

    const { user } = useUser()
    const sectionId = section.id
    // const queryClient = useQueryClient()
    // const [bodies, setBodies] = useState([])
    const [filteredBodies, setFilteredBodies] = useState("")
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
            {/* {bodies.data.map(body => (
                <Body 
                    key={body.id}
                    body={body}
                />
            ))} */}
            {/* {console.log("section Id", section.id)}
            {console.log("bodies data", bodies.data)} */}
            {/* {queryClient.invalidateQueries({ queryKey: ["bodies"] })} */}
            {/* {console.log("filtered", filteredBodies)} */}
        </>
    )
}

export default Bodies