import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PersistLogin from './Components/PersistLogin'
import Profile from './pages/Profile'
import RequireAuth from './Components/RequireAuth'
import PostPage from './pages/PostPage'
import Posts from './pages/Posts'
import Post from './Components/postsReadOnly/Post'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from './hooks/useUser'

const App = () => {

  const {user} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.username) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='main'>
      <Header />
      <div className='main-body'>
        <Routes>
          <Route path='posts' element={<Posts />}/>
          <Route path='posts/:id' element={<Post />}/>
          <Route path='signup' element={<Signup />}/>
          <Route path='login' element={<Login />}/>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='' element={<Dashboard />}/>
              <Route path='profile' element={<Profile />}/>
              <Route path='post/:id' element={<PostPage />}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
