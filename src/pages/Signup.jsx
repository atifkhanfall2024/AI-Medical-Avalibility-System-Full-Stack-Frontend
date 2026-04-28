import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  Lock,
  User,
  Stethoscope,
  Pill,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roles = [
  { value: "user", label: "User", description: "Patient access", icon: Stethoscope },
  { value: "pharmacy", label: "Pharmacy", description: "Manage meds", icon: Pill },
  { value: "admin", label: "Admin", description: "Full control", icon: ShieldCheck },
];

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Welcome ${name || "to MediCare"}! Signed up as ${role}.`);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-2 overflow-hidden bg-black">

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
              Create your MediCare account
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Trusted healthcare, all in one place.
            </p>
          </div>
        </div>

        {/* 🔥 Glow Wrapper */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>

          {/* Card */}
          <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl p-7 shadow-[0_25px_100px_rgba(0,0,0,0.8)]">
            
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 rounded-xl bg-white/20 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
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
                <Label>Password</Label>
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

              {/* Roles */}
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map(({ value, label, description, icon: Icon }) => {
                    const active = role === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        className={cn(
                          "p-3 rounded-xl border text-center flex flex-col items-center gap-1 transition-all",
                          active
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent scale-105"
                            : "border-white/10 text-gray-300 hover:border-purple-400 hover:scale-105"
                        )}
                      >
                        <Icon size={16} />
                        <span className="text-sm">{label}</span>
                        <span className="text-[10px] opacity-70">{description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.02] transition-all">
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;