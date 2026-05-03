import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Store, MapPin, Phone, Wifi, WifiOff,
  CheckCircle2, Building2, Clock, Sparkles, Pill,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import getCoordinates from "@/utils/getLocation";

const seed = [
  { id: "PH-2041", name: "GreenCare Pharmacy", location: "Lahore, Gulberg III", phone: "+92 300 1234567", isOnline: true, createdAt: "Today, 10:24 AM" },
  { id: "PH-2040", name: "MediPlus 24/7", location: "Karachi, Clifton Block 5", phone: "+92 321 9988776", isOnline: false, createdAt: "Yesterday" },
  { id: "PH-2039", name: "City Drug Store", location: "Islamabad, F-7 Markaz", phone: "+92 333 4455667", isOnline: true, createdAt: "2 days ago" },
];

const Pharmacy = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [list, setList] = useState(seed);

  const valid =
    name.trim().length >= 2 &&
    location.trim().length >= 2 &&
    phone.trim().length >= 7;

  // ✅ FIXED FUNCTION
  const HandleForm = async () => {
    if (!valid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setSubmitting(true);

    try {
      // ✅ get coordinates ONLY when button clicked
      //const coords = await getCoordinates(location);

      //console.log("coords:", coords); // should be [lng, lat]

      const res = await axios.post(
        `${Backend_URL}/form/create`,
        {
          name,
          phone,
          isOnline,

          
          location:location
        },
        { withCredentials: true }
      );

      toast.success(res?.data?.message || "Pharmacy Register Success");

      // ✅ UI update
      const entry = {
        id: `PH-${Math.floor(2042 + Math.random() * 900)}`,
        name,
        location,
        phone,
        isOnline,
        createdAt: "Just now",
      };

      setList((prev) => [entry, ...prev]);

      // ✅ reset form
      setName("");
      setLocation("");
      setPhone("");
      setIsOnline(true);

    } catch (error) {
      console.log(error);
      toast.error("Not Register Pharmacy");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 flex justify-center">
      <main className="w-full max-w-6xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <Badge className="mb-3 bg-white border text-gray-600">
            <Pill className="size-3 mr-1" /> Pharmacy Portal
          </Badge>

          <h1 className="text-4xl font-bold text-white">
            Register Your Pharmacy
          </h1>

          <p className="text-white mt-2 max-w-xl mx-auto">
            Add your pharmacy details to join the AMAS Medical network.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* Form */}
          <Card className="lg:col-span-2 bg-white border shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="size-5 text-teal-500" /> Pharmacy Information
              </CardTitle>
              <CardDescription>
                All fields are required to complete registration.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-5">

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Building2 className="size-3.5 text-gray-400" /> Pharmacy Name
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. GreenCare Pharmacy"
                    className="h-11 bg-gray-50 border-gray-200 focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-gray-400" /> Location
                  </Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Area / Address"
                    className="h-11 bg-gray-50 border-gray-200 focus:border-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Phone className="size-3.5 text-gray-400" /> Phone Number
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="h-11 bg-gray-50 border-gray-200 focus:border-teal-500"
                  />
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-lg grid place-items-center ${isOnline ? "bg-teal-100 text-teal-600" : "bg-gray-200"}`}>
                      {isOnline ? <Wifi /> : <WifiOff />}
                    </div>
                    <div>
                      <Label>Online Availability</Label>
                      <p className="text-xs text-gray-500">
                        Accepting online orders
                      </p>
                    </div>
                  </div>
                  <Switch checked={isOnline} onCheckedChange={setIsOnline} />
                </div>

                {/* Button */}
                <Button
                  type="button"
                  onClick={HandleForm}
                  disabled={!valid || submitting}
                  className="w-full h-11 text-white text-base rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500"
                >
                  {submitting ? (
                    <>
                      <Clock className="mr-2 animate-spin" /> Submitting
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2" /> Register Pharmacy
                    </>
                  )}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-white border shadow-md rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-4 text-white">
              <div className="flex items-center gap-2 text-xs uppercase">
                <Sparkles className="size-3" /> Live Preview
              </div>
            </div>

            <CardContent className="p-5 space-y-3">
              <div className="font-semibold">
                {name || "Your Pharmacy Name"}
              </div>
              <div className="text-sm text-gray-500">
                {location || "Location not set"}
              </div>
              <div className="text-sm text-gray-500">
                {phone || "Phone not set"}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Pharmacy;