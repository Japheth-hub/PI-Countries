import { useState } from 'react'
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import { useSelector } from 'react-redux'

function App() {
  // const [page, setPage] = useState(1)

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        <Route 
          path='/home'
          element={<div className='routeHome'>
            <Home />
          </div>}
        />
        <Route
          path='/detail/:id'
          element={<Detail/>}
        />
      </Routes>
    </div>
  )
}

export default App
