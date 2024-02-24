import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'

function App() {
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
        <Route
          path='*'
          element={<div className='routeHome'>
          <Home />
        </div>}
        />
      </Routes>
    </div>
  )
}

export default App
