import { useState } from "react"
import useLogin from "../hooks/useLogin"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loginMutation = useLogin()


    const handleSubmit = e => {
        e.preventDefault()
        loginMutation({ user: {
            username,
            password
        }})
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login