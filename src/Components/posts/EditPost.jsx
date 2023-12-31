import { useState } from "react"
import { Link } from "react-router-dom"
import Topics from "./Topics"
import { useQueryClient } from "@tanstack/react-query"

const EditPost = (props) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.post.title)
    const [topic, setTopic] = useState(props.post.topic.title)


    const handleEdit = (topic, title) => {
        setEdit(prev => !prev)
        props.handleEdit(topic, title)
    }

    const handleDelete = () => {
        props.handleDelete()
    }

    return (
        <>
            {edit 
            ? 
            <div className="post-form">
                <input 
                    className="create-post-input"
                    type="text" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Topics 
                    topic={props.post.topic}
                    handleEdit={handleEdit}
                    title={title}
                />
            </div>
            :
            <>
                <Link to={`/post/${props.post.id}`}><h2>{title}</h2></Link>
                <p>{topic}</p>
                <button onClick={() => setEdit(prev => !prev)}>Edit</button>
                <button onClick={() => handleDelete()} className="danger-btn">Delete</button>
            </>
            }
    
        </>
    )
}

export default EditPost