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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const entry = {
        id: `PH-${Math.floor(2042 + Math.random() * 900)}`,
        name: name.trim(),
        location: location.trim(),
        phone: phone.trim(),
        isOnline,
        createdAt: "Just now",
      };

      setList([entry, ...list]);

      toast.success(`${entry.name} registered successfully ✓`);

      setName("");
      setLocation("");
      setPhone("");
      setIsOnline(true);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#eef6f7] flex justify-center">
      <main className="w-full max-w-6xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <Badge className="mb-3 bg-white border text-gray-600">
            <Pill className="size-3 mr-1" /> Pharmacy Portal
          </Badge>

          <h1 className="text-4xl font-bold text-gray-800">
            Register Your Pharmacy
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
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

                {/* Location */}
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

                {/* Phone */}
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
                  type="submit"
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
              <p className="text-xs mt-1">
                How patients will see your pharmacy
              </p>
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

        {/* List */}
     <div className="grid md:grid-cols-2 mt-4 lg:grid-cols-3 gap-4">
  {list.map((p, i) => (
    <div
      key={p.id}
      className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold">
            {p.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>

          {/* Name + ID */}
          <div>
            <div className="font-semibold text-gray-800">
              {p.name}
            </div>
            <div className="text-xs text-gray-400">
              {p.id}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`text-xs px-2 py-1 rounded-full border ${
            p.isOnline
              ? "bg-teal-50 text-teal-600 border-teal-200"
              : "bg-gray-100 text-gray-500 border-gray-200"
          }`}
        >
          {p.isOnline ? "Online" : "Offline"}
        </div>
      </div>

      {/* Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center gap-1">
          📍 {p.location}
        </div>
        <div className="flex items-center gap-1">
          📞 {p.phone}
        </div>
        <div className="flex items-center gap-1">
          ⏱ {p.createdAt}
        </div>
      </div>
    </div>
  ))}
</div>

      </main>
    </div>
  );
};

export default Pharmacy;