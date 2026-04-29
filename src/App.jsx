import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/login'
import { Toaster } from "sonner";
import VerifyOtp from './pages/Auth/VerifyOtp';
import './App.css'
import DashBoard from './pages/Dashboard/main';
import { useSelector } from 'react-redux';



function App() {
 
   const user = useSelector((store)=>store?.user)
   console.log("App" ,  user);

  return (
  
    <div>
       <Toaster position="top-right" richColors />
       
       <BrowserRouter basename='/'>

       <Routes>
       
       <Route path='/signup' element={user? <Navigate to={'/'} /> :   <Signup/> }     />
       <Route path='/login' element={user? <Navigate to={'/'} /> : <Login/>} />
       <Route path='/verify-otp' element={user? <Navigate to={'/'} /> : <VerifyOtp/>} />
       <Route path='/' element={<DashBoard/>}/>
       </Routes>


   </BrowserRouter>
    </div>
      
   
  )
}

export default App
