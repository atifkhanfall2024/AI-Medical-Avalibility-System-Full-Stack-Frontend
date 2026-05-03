import { Link, useNavigate } from "react-router-dom";
import { Activity, Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUsers } from "@/Redux/userslice";

export const Header = ({ name, avatarUrl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const safeName = name || "User";
 const user = useSelector((store)=>store.user)
 console.log(user);
  const navItems = [
  { name: "Dashboard", path: "/feed" },
  { name: "Search Tablet", path: "/search" },
  { name:user?.Role === "Pharmacy" && user?.status === "Approved"?"PharmacyForm" : "Near Pharmacies", path:
    user?.Role === "Pharmacy" && user?.status === "Approved"
      ? "/pharmacy/form"
      : "avalible/pharmacy" },
  { name:user?.Role === "Admin" && user?.status === "Approved"?"Admin" : "Reports", path:
    user?.Role === "Admin" && user?.status === "Approved"
      ? "/admin"
      : "/report"  },

       {
      name:user?.Role === "Pharmacy" && user?.status === "Approved"?"User Requests" : "", path:
    user?.Role === "Pharmacy" && user?.status === "Approved"
      ? "/request/users"
      : ""
      },
];

  const initials = safeName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${Backend_URL}/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message || "Logout Success");
      dispatch(removeUsers());
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      
      {/* CENTERED CONTAINER */}
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center px-4">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 grid place-items-center">
              <Activity className="size-5 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              AMAS Medical
            </span>
          </Link>
        </div>

        {/* CENTER: NAV */}
      <nav className="hidden md:flex items-center gap-2 mx-auto">
  {navItems.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-black rounded-md hover:bg-gray-100 transition"
    >
      {item.name}
    </Link>
  ))}
</nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-gray-100 border-0 w-64"
              />
            </div>
          </div>

          {/* NOTIFICATION */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
          </Button>

          {/* AVATAR */}
          <Avatar className="size-9">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={safeName} />}
            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* SIGN OUT */}
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="text-red-500 flex items-center gap-1"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>

        </div>
      </div>
    </header>
  );
};