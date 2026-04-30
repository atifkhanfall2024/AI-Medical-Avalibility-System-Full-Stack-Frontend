import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Pill, MapPin, Search, ArrowLeft, Sparkles, Loader2, Crosshair,
} from "lucide-react";
import axios from "axios";
import Backend_URL from "@/utils/constant";

const popularMeds = [
  "Paracetamol",
  "Ibuprofen",
  "Amoxicillin",
  "Cetirizine",
  "Aspirin",
  "Metformin",
];

const SearchTablet = () => {
  const navigate = useNavigate();

  const [tablet, setTablet] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState(null);


 const HandleRequest = async (e) => {
  e.preventDefault();

  if (!tablet.trim()) {
    return toast.error("Enter tablet name");
  }

  if (!coords) {
    return toast.error("Use GPS to get location");
  }

  try {
    const res = await axios.post(
      `${Backend_URL}/userRequest/create`,
      {
        Query: tablet,
        Location: coords,
      },
      { withCredentials: true }
    );

    toast.success("Request sent successfully");
    setCoords('')
    setLocation('')
    setTablet('')

  } catch (error) {
    toast.error("Request failed");
  }
};

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

  const handleSearch = (e) => {
    e.preventDefault();

    if (!tablet.trim()) {
      toast.error("Please enter a tablet name");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter your location");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(`Searching "${tablet}" near ${location}…`);
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

    
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">

          <Button
            variant="ghost"
            onClick={() => navigate("/feed")}
            className="text-white hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="size-4 mr-1" /> Back to dashboard
          </Button>

          <div className="max-w-2xl">
            <Badge className="bg-white/20 text-white border-none mb-4">
              <Sparkles className="size-3.5 mr-1.5" /> AI-Powered Search
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold">
              Search a tablet near you
            </h1>

            <p className="mt-4 text-lg opacity-90">
              Enter the medicine and location — we’ll find pharmacies instantly.
            </p>
          </div>

        </div>
      </section>

      {/* FORM SECTION */}
      <section className="-mt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          <Card className="shadow-lg border border-gray-200 rounded-2xl">
            <CardContent className="p-6 md:p-8">

              {/* FORM (UNCHANGED) */}
              <form onSubmit={handleSearch} className="space-y-5">

                {/* MEDICINE */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Pill className="size-4 text-primary" /> Tablet / Medicine name
                  </Label>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      value={tablet}
                      onChange={(e) => setTablet(e.target.value)}
                      placeholder="e.g. Paracetamol 500mg"
                      className="pl-9 h-12"
                    />
                  </div>
                </div>

                {/* LOCATION */}
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

                {/* SUBMIT */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={HandleRequest}
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="size-5 mr-2" />
                      Find Tablet nearby pharmacies
                    </>
                  )}
                </Button>

              </form>

              {/* POPULAR */}
              <div className="mt-7 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">
                  Popular searches
                </p>

                <div className="flex flex-wrap gap-2">
                  {popularMeds.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTablet(m)}
                      className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-cyan-500 hover:text-white transition"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
};

export default SearchTablet;