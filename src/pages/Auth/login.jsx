import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { useDispatch } from "react-redux";
import { addUsers } from "@/Redux/userslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate()
const dispatch = useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
try {
  
  const res = await axios.post(`${Backend_URL}/login` , {Email:email , Password:password} ,{withCredentials:true})
   //console.log(res?.data);
   toast.success(`Welcome back! Signed in as ${res?.data?.message?.FullName}`);
   dispatch(addUsers(res?.data?.message))
   navigate('/')
} catch (error) {
    console.error(error);
    const message =
      error?.response?.data?.message || 
      error?.response?.data ||            
      error.message ||                    
      "Something went wrong";

    toast.error(message);
}

  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100">

      <div className="w-full max-w-md">
        
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md">
            <Heart className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back to MediCare
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to continue to your dashboard.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xl">

          <form className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-700">Password</Label>
                <span className="text-xs text-blue-500 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-10 h-11 rounded-xl bg-gray-50 border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full h-11 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"  onClick={handleSubmit}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Protected by industry-standard encryption.
        </p>
      </div>
    </main>
  );
};

export default Login;