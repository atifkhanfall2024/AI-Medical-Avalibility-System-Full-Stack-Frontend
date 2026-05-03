import { addRequest } from "@/Redux/userRequestslice";
import Backend_URL from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

const useGetUsers =(user)=>{

const dispatch = useDispatch()
useEffect(()=>{
const GetUserRequest = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/CheckAvalibility`, {
        withCredentials: true,
      });
      console.log("data", res.data);
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  if(user){
   GetUserRequest()
  }

} , [user , dispatch])

}



export default useGetUsers