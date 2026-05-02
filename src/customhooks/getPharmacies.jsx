import { addPharmacy } from "@/Redux/pharmacy";
import Backend_URL from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MyComponent = (user) => {

const dispatch = useDispatch()
useEffect(()=>{
const GetAllPharmacies = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/getPharmacy`, {
        withCredentials: true,
      });
      //console.log("data", res.data);
      dispatch(addPharmacy(res?.data?.message));
    } catch (error) {
      console.log(error);
    }
  };

  if(user){
   GetAllPharmacies()
  }

} , [user])
  

};

export default MyComponent