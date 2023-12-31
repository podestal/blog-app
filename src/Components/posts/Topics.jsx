import React, { useEffect, useState } from "react"
import { getTopics } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"
import Select from "react-select"
import { useQueryClient } from "@tanstack/react-query"

const Topics = (props) => {

    const [topic, setTopic] = useState(props.topic && props.topic)
    const queryClient = useQueryClient()


    const {data: topics, isLoading, isError, error } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    })

    useEffect(() => {
        queryClient.invalidateQueries(["post"])
    }, [topic])

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    const handleEdit = () => {
        // console.log(topic.id)
        props.handleEdit(topic.id, props.title)
    }

    return (
        <>
        <Select 
            getOptionValue={e => e.id}
            getOptionLabel={e => e.title}
            options={topics.data}
            onChange={option => setTopic(option)}
            defaultValue={topic}
            // value={topic}
        />
        {props.handleSubmit 
            ?<button onClick={() => props.handleSubmit(topic)}>Create Post</button>
            :<button onClick={handleEdit}>Save Post</button>
        }
        </>
    )
}

export default Topics