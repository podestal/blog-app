import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createUser, createAuthor } from "../api/axios"
import useUser from "../hooks/useUser"
import useLogin from "../hooks/useLogin"
import { Link } from "react-router-dom"

const Signup = () => {

    const {user, setUser} = useUser()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [pwd, setPwd] = useState("")
    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [job_title, setJobTitle] = useState("")

    const loginMutation = useLogin()

    const {mutate: createAuthorMutation} = useMutation({
        mutationFn: (data) => createAuthor(data),
        onSuccess: res => {
            
            setUser({ 
                ...user, 
                authorId: res.data.id, 
                jobTitle: res.data.job_title, 
                memberSince: res.data.member_since 
            })
            loginMutation({ user: {
                username,
                password
            }})
        },
        onError: (err) => console.log("Create Author", err)
    })

    const {mutate: createUserMutation} = useMutation({
        mutationFn: (data) => createUser(data),
        onSuccess: (res) => {
            setUser(res.data)
            createAuthorMutation({ author: {
                job_title, user: res.data.id
            }})
        },
        onError: (err) => console.log("Create user", err)
    })
    

    const handleSubmit = e => {
        e.preventDefault()
        if (password === pwd) {
            createUserMutation({ user: {
                username,
                email,
                password,
                first_name,
                last_name
            }})
                
        }

    }

    return (
        <div className="auth">
            <h2>Sign Up</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Re-Password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="First Name"
                    value={first_name}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Job Title"
                    value={job_title}
                    onChange={e => setJobTitle(e.target.value)}
                />
                <button>Signup</button>
            </form>
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    )
}

export default Signup