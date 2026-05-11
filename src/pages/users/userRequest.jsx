import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Store } from "lucide-react";
import { useSelector } from "react-redux";
import GetUsers from "@/customhooks/userRequest";
import useGetUsers from "@/customhooks/userRequest";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


const seed = [
  { id: "PH-2041", name: "GreenCare Pharmacy", location: "Lahore, Gulberg III", phone: "+92 300 1234567", isOnline: true, createdAt: "Today, 10:24 AM" },
  { id: "PH-2040", name: "MediPlus 24/7", location: "Karachi, Clifton Block 5", phone: "+92 321 9988776", isOnline: false, createdAt: "Yesterday" },
  { id: "PH-2039", name: "City Drug Store", location: "Islamabad, F-7 Markaz", phone: "+92 333 4455667", isOnline: true, createdAt: "2 days ago" },
];

const UserRequest = () => {
  const [list] = useState(seed);
  const [addresses, setAddresses] = useState({});
  
const [requestsList, setRequestsList] = useState([]);
const navigate = useNavigate()

  // ✅ Only Online Pharmacies
  const available = list.filter((p) => p.isOnline);
  const user =  useSelector((store)=>store?.user)
  const request = useSelector((store)=>store?.request || [])
  useGetUsers(user)

  useEffect(() => {
  if (request?.length > 0) {
    setRequestsList(request);
  }
}, [request]);

  const HandleUserRequest = async(id , status)=>{
      try {
        
        const res = await axios.post(`${Backend_URL}/ChangeStatus/${id}/${status}` , {} , {withCredentials:true})
        setRequestsList((prev) => prev.filter((item) => item._id !== id));
       toast.success(`Request ${status} Success`)
      } catch (error) {
        console.log(error);
        toast.error(`Request ${status} failed`)
      }
  }

  useEffect(() => {
  const fetchAddresses = async () => {
    const newAddresses = {};

    for (let p of request) {
      if (p?.location?.coordinates) {
        const [lng, lat] = p.location.coordinates;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        const area =
          data.address?.suburb ||
          data.address?.neighbourhood ||
          data.address?.village ||
          "";

        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.county ||
          "";

        const country = data.address?.country || "";

        newAddresses[p._id] = `${area}, ${city}, ${country}`;
      }
    }

    setAddresses(newAddresses);
  };

  if (request.length > 0) {
    fetchAddresses();
  }
}, [request]);



  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex justify-center">
      <main className="w-full max-w-6xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">
            Available Request
          </h1>
          <p className="text-white mt-2">
            Browse pharmacies currently available online.
          </p>
        </div>

        {/* Cards */}
        <Card className="bg-white border shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="text-teal-500" />
              Available Request
              <Badge>{available.length}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {requestsList.length > 0 ? (
  requestsList.map((p) => (
    <div
      key={p._id}
      className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold text-sm">
            {p?.userId?.FullName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Name + Time */}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              {p?.userId?.FullName || "Unknown User"}
            </h3>
            <p className="text-xs text-gray-400">
              {new Date(p?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs px-3 py-1 rounded-full border font-medium ${
            p?.status === "pending"
              ? "bg-yellow-50 text-yellow-600 border-yellow-200"
              : p?.status === "approved"
              ? "bg-green-50 text-green-600 border-green-200"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {p?.status || "Unknown"}
        </span>
      </div>

      {/* Medicine Section */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-1">Requested Medicine</p>
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-600 border border-teal-200 font-medium">
          💊 {p?.medicineName || "N/A"}
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-gray-400" />
          <span>{p?.userId?.PhoneNumber || "No phone"}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-gray-400" />
          <span className="truncate">
            {addresses[p?._id] || "Loading....."}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-4 text-gray-400" />
          <span>
            {new Date(p?.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Action Buttons (Optional but 🔥) */}
     {/* Action Buttons */}
<div className="mt-5 flex gap-2">

  {/* Accept */}
  <button
    className="flex-1 text-xs bg-gradient-to-r from-cyan-500 to-blue-600 
    hover:opacity-90 text-white py-2 rounded-lg transition font-medium"
    onClick={() => HandleUserRequest(p?._id, "completed")}
  >
    Accept
  </button>

  {/* Reject */}
  <button
    className="flex-1 text-xs bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition font-medium"
    onClick={() => HandleUserRequest(p?._id, "rejected")}
  >
    Reject
  </button>

  {/* Chat Button */}
  <button
    className="flex items-center justify-center gap-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
    onClick={() => navigate(`/chat/${p?.userId?._id}`)}
  >
    <MessageCircle className="size-4" />
    Chat
  </button>

</div>
    </div>
  ))
) : (
  <div className="col-span-full text-center text-gray-500 py-10">
    No requests found.
  </div>
)}

              {/* Empty State */}
              {available.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No pharmacies available right now.
                </div>
              )}

            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default UserRequest;