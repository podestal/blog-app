import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const {user, setUser} = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        setUser()
        window.localStorage.removeItem("refreshToken")
        navigate('/login')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <header className="main-header">
            <div className="main-header-body">
                <h2 className="logo">{user ? <Link to={'/'}>Blog</Link> : <Link to={'/posts'}>Blog</Link> }</h2>
                <nav>
                <Link to='/posts'>Posts</Link>
                {user?.username 
                    ?   
                    <>
                        <Link to='/'>Dashboard</Link>
                        <Link to='/profile'>Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                    :
                    <>
                        <button onClick={handleLogin}>Login</button>
                    </>
                }
                </nav>
            </div>
        </header>
    )
}

export default Header