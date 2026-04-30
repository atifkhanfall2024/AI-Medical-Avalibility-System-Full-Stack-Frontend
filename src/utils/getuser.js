import axios from "axios";
import { useDispatch } from "react-redux";
import Backend_URL from "./constant";
import { addUsers } from "@/Redux/userslice";
import { useEffect } from "react";


const useGetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${Backend_URL}/me`, {
          withCredentials: true,
        });
       
        if (res.data.user) {
          dispatch(addUsers(res.data.user));
        }
      } catch (err) {
        console.log("No user logged in");
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useGetUser;