import Admin from "@/pages/Admin/admin";
import { addAdmins } from "@/Redux/Admin";
import Backend_URL from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

const GetAdmins = async(user)=>{

    const dispatch   = useDispatch()

   useEffect(()=>{
const GetAllAdmins = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/getadmins`, {
        withCredentials: true,
      });
      //console.log("data", res.data);
      dispatch(addAdmins(res?.data?.message));
    } catch (error) {
      console.log(error);
    }
  };

  if(user){
   GetAllAdmins()
  }

} , [user])

}


export default GetAdmins