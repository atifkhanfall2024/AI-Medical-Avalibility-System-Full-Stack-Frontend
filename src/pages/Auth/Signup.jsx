import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
  MapPin,
  Crosshair,
  Loader2,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Backend_URL from "@/utils/constant";


const roles = [
  { value: "User", label: "User", description: "Patient access", icon: Stethoscope },
  { value: "Pharmacy", label: "Pharmacy", description: "Manage meds", icon: Pill },
  { value: "Admin", label: "Admin", description: "Full control", icon: ShieldCheck },
];

const Index = () => {
  const [name, setName] = useState("");
  const [phone , setPhone] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const [license, setLicense] = useState(null);


  const handleUseMyLocation = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

  setLocating(true);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setCoords([lng, lat]);
      setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`); 

      setLocating(false);
      toast.success("Location detected");
    },
    () => {
      setLocating(false);
      toast.error("Unable to fetch location");
    }
  );
};

const handleImage = (e) => {
  setImage(e.target.files[0]);
};



  const handleSubmit = async(e) => {
    e.preventDefault();

    if (role === "Pharmacy" && !license) {
  toast.error("Pharmacy license is required");
  return;
}

const formData = new FormData()
formData.append("Photo" , image)
formData.append("Email", email);
formData.append("Password", password);
formData.append("FullName", name);
formData.append("Role", role);
formData.append("PhoneNumber", phone);
formData.append("location", JSON.stringify(coords));
formData.append("License", license);

  try {
      const response = await axios.post(`${Backend_URL}/signup` ,
   formData, {withCredentials:true})

    console.log(response.data);
    toast.success(` ${response?.data}   Welcome ${name || "to MediCare"}! Signed up as ${role}.`);
    navigate("/verify-otp");
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
    <main className="flex min-h-screen items-center justify-center px-4 py-6 bg-gradient-to-br from-blue-50 to-blue-100">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md">
            <Heart className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create your MediCare account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Trusted healthcare, all in one place.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xl">

          <form className="space-y-5">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
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
              <Label className="text-gray-700">Password</Label>
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  placeholder="+92..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-300 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
       {/* Location */}
 <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <MapPin className="size-4 text-primary" /> Your location
                  </Label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, area or pincode"
                        className="pl-9 h-12"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUseMyLocation}
                      disabled={locating}
                      className="h-12"
                    >
                      {locating ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Crosshair className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
            {/* Roles */}
      <div className="space-y-2">
  <Label className="text-gray-700">Profile Photo</Label>

  <div className="flex items-center gap-4">
    
    {/* Preview Box */}
    <div className="relative">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="h-20 w-20 rounded-2xl object-cover border shadow-md"
        />
      ) : (
        <div className="h-20 w-20 rounded-2xl bg-gray-100 border flex items-center justify-center text-gray-400">
          <User className="size-6" />
        </div>
      )}
    </div>

    {/* Upload Button */}
    <label className="cursor-pointer">
      <div className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
        Upload Image
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />
    </label>

    {/* Remove Button */}
    {image && (
      <button
        type="button"
        onClick={() => setImage(null)}
        className="text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    )}
  </div>
</div>

{role === "Pharmacy" && (
  <div className="space-y-2">
    <Label className="text-gray-700">
      Pharmacy License (Required)
    </Label>

    <div className="flex items-center gap-4">
      
      {/* Preview box */}
      <div className="relative">
        {license ? (
          <img
            src={URL.createObjectURL(license)}
            alt="license preview"
            className="h-20 w-20 rounded-2xl object-cover border shadow-md"
          />
        ) : (
          <div className="h-20 w-20 rounded-2xl bg-gray-100 border flex items-center justify-center text-gray-400 text-xs text-center">
            No License
          </div>
        )}
      </div>

      {/* Upload button */}
      <label className="cursor-pointer">
        <div className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition">
          Upload License
        </div>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setLicense(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Remove */}
      {license && (
        <button
          type="button"
          onClick={() => setLicense(null)}
          className="text-sm text-red-500 hover:underline"
        >
          Remove
        </button>
      )}
    </div>
  </div>
)}

            <div className="space-y-2">
              <Label className="text-gray-700">Role</Label>
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
                          ? "bg-blue-500 text-white border-transparent scale-105"
                          : "border-gray-200 text-gray-600 hover:border-blue-400 hover:scale-105"
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
            <Button
              className="w-full h-11 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
              onClick={handleSubmit}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Index;