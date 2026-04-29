import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const user = useSelector((state) => state.user);
  console.log("protected " , user);
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoute;