import { deleteBody, editBody } from "../../api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUser from "../../hooks/useUser"
import { useState } from "react"

const Body = ({body}) => {

    const [text, setText] = useState(body.text || "")
    const [edit, setEdit] = useState(false)
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const {user} = useUser()
    const queryClient = useQueryClient()

    const {mutate: editBodyMutation} = useMutation({
        mutationFn: data => editBody(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["bodies"]}),
        onError: err => console.log(err)
    })


    const {mutate: deleteBodyMutation} = useMutation({
        mutationFn: data => deleteBody(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["bodies"]}),
        onError: err => console.log(err),
    })

    // return baseAxios.patch(`${POSTS}${data.postId}/sections/${data.sectionId}/bodies/${data.bodyId}`, data.body, {
    //     headers: {Authorization: `JWT ${data.accessToken}`}
    // })

    const handleEdit = () => {
        editBodyMutation({ postId: id, sectionId: body.section,  bodyId: body.id, accessToken: user.accessToken, body:{
            text
        }})
        setEdit(prev => !prev)
    }

    const handleDelete = () => {
        deleteBodyMutation({postId: id, sectionId: body.section,  bodyId: body.id, accessToken: user.accessToken})
    }

    return (
        <div>
            {!edit 
                ?
                <div>
                    <p>{body.text}</p>
                    <button onClick={() => setEdit(prev =>!prev)}>Edit</button>
                    <button onClick={handleDelete} className="danger-btn">Delete</button>
                </div>
                :
                <div>
                    <textarea 
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                </div>
            }
        </div>
    )
}

export default Body