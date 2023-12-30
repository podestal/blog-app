import BodyForm from "./BodyForm"
import Bodies from "./Bodies"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editSection, deleteSection } from "../../api/axios"
import useUser from "../../hooks/useUser"

const Section = ({ section }) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(section.title || "")
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1]
    const { user } = useUser()
    const queryClient = useQueryClient()

    const {mutate: editSectionMutation} = useMutation({
        mutationFn: data => editSection(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
        onError: err => console.log(err),
    })

    const {mutate: deleteSectionMutation} = useMutation({
        mutationFn: data => deleteSection(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sections"] }),
        onError: err => console.log(err)
    })

    const handleEdit = () => {
        editSectionMutation({ postId: id, sectionId: section.id, accessToken: user.accessToken, section: { title } })
        setEdit(prev => !prev)
    }

    const handleDelete = () => {
        deleteSectionMutation({ postId: id, sectionId: section.id, accessToken: user.accessToken })
    }

    return (
        <div>
            <div className="edit-title">
                {edit 
                ?
                <>
                    <input 
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <button onClick={handleEdit}>Save</button>
                </>
                :
                <>
                    <h3>{section.title}</h3>
                    <button onClick={() => setEdit(prev => !prev)}>Edit</button>
                    <button className="danger-btn" onClick={handleDelete}>Delete</button>
                </>
                }
            </div>

            <Bodies 
                section={section}
            />
            <BodyForm 
                section={section}
            /> 
        </div>
    )
}

export default Section