import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BroadcastPage from './pages/Broadcast'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/loginPage'
import LearnMore from './pages/LearnMore'
import SignUp from './pages/SignPage.'
import LayoutHome from './components/LayoutHome/Layout'
import AboutPage from './pages/About'
import HomePage from './pages/HomePage'
import LayoutApp from './components/LayoutApp/Layout'
import Authorization from './Authorization'

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path='/app' element={<Authorization><LayoutApp /></Authorization>} >
            <Route index element={<HomePage />} />
            <Route path='broadcast' element={<BroadcastPage />} />
          </Route>
          <Route path='/' element={<LayoutHome />} >
            <Route index element={<LandingPage />} />
            <Route path='/learn-more' element={<LearnMore />} />
            <Route path='/about' element={<AboutPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
    </HashRouter>
  )
}

export default App
