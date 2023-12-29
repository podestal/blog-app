import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const {user, setUser} = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        setUser({})
        window.localStorage.removeItem("refreshToken")
        navigate('/login')
    }

    return (
        <header>
            <h2>Blog</h2>
            {user?.username 
                ?   
                    <nav>
                        <Link to='/'>Dashboard</Link>
                        <Link to='/profile'>Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                :
                    <nav>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
            </nav>
            }
        </header>
    )
}

export default Header