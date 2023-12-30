import { useState } from "react"
import useLogin from "../hooks/useLogin"
import { Link } from "react-router-dom"

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
        <div className="auth">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
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
            <p>Need an account? <Link to={"/signup"}>Signup</Link></p>
        </div>
    )
}

export default Login