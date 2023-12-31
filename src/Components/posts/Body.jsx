import { deleteBody, editBody } from "../../api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUser from "../../hooks/useUser"
import Edition from "../Edition"

const Body = ({body}) => {

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

    const handleEdit = (text) => {
        editBodyMutation({ postId: id, sectionId: body.section,  bodyId: body.id, accessToken: user.accessToken, body:{
            text
        }})
    }

    const handleDelete = () => {
        deleteBodyMutation({postId: id, sectionId: body.section,  bodyId: body.id, accessToken: user.accessToken})
    }

    return (
        <div>
            < Edition
                item={body}
                // edit={edit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default Body