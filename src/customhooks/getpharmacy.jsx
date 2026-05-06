import { addGetPharmacy } from "@/Redux/getpharmacy";
import Backend_URL from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetPharmacy = (user)=>{
const dispatch = useDispatch()
useEffect(()=>{
const GetAllPharmacies = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/get/pharmacy`, {
        withCredentials: true,
      });
      //console.log("data", res.data);
      dispatch(addGetPharmacy(res?.data?.message));
    } catch (error) {
      console.log(error);
    }
  };

  if(user){
   GetAllPharmacies()
  }

} , [user])
}


export default GetPharmacy