import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSection } from "../../api/axios"

const SectionForm = ({ id, user }) => {

    const queryClient = useQueryClient()
    const [title, setTitle] = useState("")
    const {mutate: createSectionMutation} = useMutation({
        mutationFn: data => createSection(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
        onError: err => console.log(err),
    })

    const handleSubmit = e => {
        e.preventDefault()
        createSectionMutation({ id,  accessToken: user.accessToken, section: { title }})
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="section-input"
                type="text" 
                placeholder="Add Section"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
        </form>
    )
}

export default SectionForm