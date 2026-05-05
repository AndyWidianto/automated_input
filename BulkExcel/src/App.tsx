import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BroadcastPage from './pages/Broadcast'
import Authorization from './Authorization'

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path='/' element={<Authorization><BroadcastPage /></Authorization>} />
        </Routes>
    </HashRouter>
  )
}

export default App
