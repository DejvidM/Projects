import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './components/Register'
import LogIn from './components/LogIn'
import { useState } from 'react'
import Main from './components/Main'
import Schedule from './components/Schedule'
import Chat from './components/Chat'

function App() {

  const [state , setState] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register setState={setState} />}></Route>
          <Route path='/login' element={<LogIn setState={setState}/>}></Route>
          <Route path='/main/:email' element={<Main/>}/>
          <Route path='/makeSchedule/:email' element={<Schedule />}/>
          <Route path='/chat/:email' element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
