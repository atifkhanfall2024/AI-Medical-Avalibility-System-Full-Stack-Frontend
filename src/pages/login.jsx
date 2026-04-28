import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Welcome back! Signed in as ${email}`);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 overflow-hidden bg-black">

      {/* 🔥 Animated Gradient */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-[linear-gradient(120deg,#020617,#0f172a,#1e1b4b,#020617)] bg-[length:300%_300%]"></div>

      {/* 🔥 Floating Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-purple-600/30 blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-600/30 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md">
        
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
            <Heart className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">
              Welcome back to MediCare
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Sign in to continue to your dashboard.
            </p>
          </div>
        </div>

        {/* Glow Wrapper */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>

          {/* Card */}
          <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl p-7 shadow-[0_25px_100px_rgba(0,0,0,0.8)]">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl bg-white/20 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Password</Label>
                  <span className="text-xs text-purple-400 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-10 h-11 rounded-xl bg-white/20 border-white/20 text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.02] transition-all">
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Protected by industry-standard encryption.
        </p>
      </div>
    </main>
  );
};

export default Login;