import { useQuery } from "@tanstack/react-query"
import { getSections } from "../../api/axios"
import Section from "./Section"

const Sections = ({ id, user }) => {

    const {data: sections, isLoading, isError, error } = useQuery({
        queryKey: ["sections"],
        queryFn: () => getSections({ id, accessToken: user.accessToken })
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

    return (
        <div>
            {sections.data.map(section =>(
                 <Section 
                    key={section.id}
                    section={section}
                 />
            ))}
        </div>
    )
}

export default Sections