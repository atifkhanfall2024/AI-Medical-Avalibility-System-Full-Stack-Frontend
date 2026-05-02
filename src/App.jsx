import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/login'
import { Toaster } from "sonner";
import VerifyOtp from './pages/Auth/VerifyOtp';
import './App.css'
import DashBoard from './pages/Dashboard/main';
import { useSelector } from 'react-redux';
import useGetUser from './utils/getuser';
import Feed from './pages/Dashboard/feed';
import SearchTablet from './pages/Dashboard/searchTab';
import Admin from './pages/Admin/admin';
import MyComponent from './customhooks/getPharmacies';
import GetAdmins from './customhooks/getAdmins';
import Pharmacy from './pages/pharmacy/pharmacy';
import AvailablePharmacies from './pages/pharmacy/avalible';



function App() {
 
    useGetUser()
   
    //console.log("data" , data);
   const user = useSelector((store)=>store?.user)
  // console.log("App" ,  user);
   MyComponent(user)
   GetAdmins(user)

  return (
  
    <div>
       <Toaster position="top-right" richColors />
       
       <BrowserRouter basename='/'>

       <Routes>
       
       <Route path='/signup' element={user? <Navigate to={'/'} /> :   <Signup/> }     />
       <Route path='/login' element={user? <Navigate to={'/'} /> : <Login/>} />
       <Route path='/verify-otp' element={user? <Navigate to={'/'} /> : <VerifyOtp/>} />
      
       <Route path='/' element={user?<DashBoard/>: <Navigate to={'/login'} />}>
       <Route index element={<Navigate to="feed" />} />
       <Route path="feed" element={<Feed />} />
       <Route path='search' element={<SearchTablet/>}/>
       <Route  path='admin' element={<Admin/>} />
       <Route path='pharmacy/form' element={<Pharmacy/>} />
       <Route path='avalible/pharmacy' element={<AvailablePharmacies/>}/>
       </Route>
       </Routes>


   </BrowserRouter>
    </div>
      
   
  )
}

export default App
