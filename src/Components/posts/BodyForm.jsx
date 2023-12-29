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
        <form onSubmit={handleSubmit}>
            <textarea 
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button>Add body</button>
        </form>
    )
}

export default BodyForm