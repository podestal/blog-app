import { getTopics } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"

const Topics = () => {

    const {data: topics, isLoading, isError, error} = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <select name="topics" defaultValue={topics.data[0]}>
            {topics.data.map(topic => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
        </select>
    )
}

export default Topics