import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const Edition = (props) => {

    const [edit, setEdit] = useState(props.edit)
    const [title, setTitle] = useState(props.item.title) 
    const [text, setText] = useState( props.item.text)
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ["posts"]})
    }, [])

    const handleEdit = () => {
        title ? props.handleEdit(title) : props.handleEdit(text)
        setEdit(prev => !prev)
    }

    const handleDelete = () => {
        props.handleDelete()
    }

    return (
        <>
        {title 
        ?
        <>
            {edit
            ? 
            <div>
                <input 
                    type="text"
                    value={title}
                    onChange={(e => setTitle(e.target.value))}
                />
                <button onClick={handleEdit}>Save</button>
            </div>
            :
            <div className="title-container">
                <h1>{title}</h1>
                <button onClick={() => setEdit(prev => !prev)}>Edit</button>   
                {props.handleDelete && <button onClick={handleDelete} className="danger-btn">Delete</button>}
            </div>}
         </>
        :
        <>
        {!edit 
                ?
                <div>
                    <p>{text}</p>
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
        
        </>


        
        }
        </>
    )
}



export default Edition