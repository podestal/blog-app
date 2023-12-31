import { useQuery } from "@tanstack/react-query"
import { getSections } from "../../api/axios"
import Section from "./Section"
import Bodies from "./Bodies"

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
                <div key={section.id}>
                    <Section 
                        section={section}
                    />
                    {/* <Bodies 
                        key={section.id + 10}
                        section={section}
                    /> */}
                </div>
            ))}
        </div>
    )
}

export default Sections