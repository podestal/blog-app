import { useMutation } from "@tanstack/react-query"
import { createBody } from "../../api/axios"
import { useState } from "react"
import useUser from "../../hooks/useUser"
import { useQueryClient } from "@tanstack/react-query"

const BodyForm = ({ section }) => {

    const {user} = useUser()
    const queryClient = useQueryClient()
    const [text, setText] = useState("")
    const {mutate: createBodySection} = useMutation({
        mutationFn: data => createBody(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["bodies"]}),
        onError: err => console.log(err)
    })

    const handleSubmit = e => {
        e.preventDefault()
        createBodySection({ postId:section.post, sectionId: section.id, accessToken: user.accessToken, body: { text } })
        setText("")
    }

    return (
        <form className="edit-title" onSubmit={handleSubmit}>
            <input 
                className="body-input"
                placeholder="Text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
        </form>
    )
}

export default BodyForm