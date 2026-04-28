import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/login'
import './App.css'


function App() {
 

  return (
  
    <div>
       <BrowserRouter basename='/'>

       <Routes>

       <Route path='/signup' element={<Signup/>}     />
       <Route path='/login' element={<Login/>} />

       </Routes>


   </BrowserRouter>
    </div>
      
   
  )
}

export default App
