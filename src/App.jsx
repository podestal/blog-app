import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PersistLogin from './Components/PersistLogin'
import Profile from './pages/Profile'
import RequireAuth from './Components/RequireAuth'
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
      <Routes>
        <Route path='signup' element={<Signup />}/>
        <Route path='login' element={<Login />}/>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='' element={<Dashboard />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
