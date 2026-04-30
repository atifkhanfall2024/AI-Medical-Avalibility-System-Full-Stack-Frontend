import { useState } from "react";
import {
  Sparkles, Search, Info, MapPin, Store,
  User, Pill, Bot, Clock, ArrowRight,
  ShieldCheck, Activity
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {

    const user = useSelector((store)=>store.user)
   const navigate = useNavigate()
  const [profile] = useState({
    full_name: user?.FullName || "Guest",
  });

  const HandleRoute = async(e)=>{
       e.preventDefault()
       console.log('button clicked');
       navigate('/search')
  }

  const name = profile?.full_name || "there";

  const steps = [
    { icon: Search, title: "Search", desc: "Type the tablet or medicine you need." },
    { icon: Bot, title: "AI matches", desc: "Our AI scans nearby pharmacies for live stock." },
    { icon: MapPin, title: "Locate", desc: "See pharmacies sorted by distance & availability." },
    { icon: Pill, title: "Get it", desc: "Pharmacy confirms — you pick up or request delivery." },
  ];

  const features = [
    { icon: User, title: "For Patients", desc: "Search medicines and instantly find which nearby pharmacies have them in stock." },
    { icon: Store, title: "For Pharmacies", desc: "Receive live requests, update availability and respond in real time." },
    { icon: ShieldCheck, title: "For Admins", desc: "Oversee users, verify pharmacies and maintain system health." },
  ];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white">

        <div className="max-w-6xl mx-auto px-4 py-20 text-center">

          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI-Powered Medical Availability</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find the right medicine,<br />
            <span className="text-cyan-200">at the nearest pharmacy.</span>
          </h1>

          <p className="mt-6 text-lg opacity-90 max-w-2xl mx-auto">
            Hi {name} 👋 — AMAS connects you to verified pharmacies in real time.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition" onClick={HandleRoute}>
              <Search className="w-5 h-5" />
              Search a Tablet
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 border border-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
              <Info className="w-5 h-5" />
              Explore
            </button>
          </div>

        </div>
      </section>

      {/* MAIN LIGHT SECTION */}
      <section className="bg-gray-50">

        {/* HOW IT WORKS */}
        <div className="max-w-6xl mx-auto px-4 py-20">

          <div className="text-center mb-12">
            <Badge className="mb-3">
              <Bot className="size-3.5 mr-1.5" /> How it works
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              From search to shelf, in seconds
            </h2>

            <p className="mt-3 text-gray-500">
              Our AI bridges patients and pharmacies — no calls needed.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((s, i) => (
              <Card
                key={s.title}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl"
              >
                <CardContent className="p-6">

                  {/* ICON */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-semibold text-cyan-600 mb-1">
                    STEP {i + 1}
                  </p>

                  <h3 className="font-semibold text-lg">{s.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>

                </CardContent>
              </Card>
            ))}

          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-6xl mx-auto px-4 pb-20">

          <div className="text-center mb-12">
            <Badge className="mb-3">
              <Activity className="size-3.5 mr-1.5" /> One platform
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              Built for everyone
            </h2>

            <p className="mt-3 text-gray-500">
              Patients, pharmacies, admins — all connected.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {features.map((f) => (
              <Card
                key={f.title}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl"
              >
                <CardContent className="p-7">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-5">
                    <f.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold">{f.title}</h3>

                  <p className="text-gray-500 mt-2">{f.desc}</p>

                  <Button variant="ghost" className="mt-4 px-0 text-cyan-600 hover:bg-transparent">
                    Learn more <ArrowRight className="size-4 ml-1" />
                  </Button>

                </CardContent>
              </Card>
            ))}

          </div>
        </div>

      </section>
    </div>
  );
};

export default Feed;