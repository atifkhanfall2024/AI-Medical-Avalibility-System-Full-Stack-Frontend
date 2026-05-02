import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Store } from "lucide-react";

const seed = [
  { id: "PH-2041", name: "GreenCare Pharmacy", location: "Lahore, Gulberg III", phone: "+92 300 1234567", isOnline: true, createdAt: "Today, 10:24 AM" },
  { id: "PH-2040", name: "MediPlus 24/7", location: "Karachi, Clifton Block 5", phone: "+92 321 9988776", isOnline: false, createdAt: "Yesterday" },
  { id: "PH-2039", name: "City Drug Store", location: "Islamabad, F-7 Markaz", phone: "+92 333 4455667", isOnline: true, createdAt: "2 days ago" },
];

const AvailablePharmacies = () => {
  const [list] = useState(seed);

  // ✅ Only Online Pharmacies
  const available = list.filter((p) => p.isOnline);

  return (
    <div className="min-h-screen bg-[#eef6f7] flex justify-center">
      <main className="w-full max-w-6xl px-4 py-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Available Pharmacies
          </h1>
          <p className="text-gray-500 mt-2">
            Browse pharmacies currently available online.
          </p>
        </div>

        {/* Cards */}
        <Card className="bg-white border shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="text-teal-500" />
              Available Pharmacies
              <Badge>{available.length}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {available.map((p) => (
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

                    {/* Status */}
                    <div className="text-xs px-2 py-1 rounded-full border bg-teal-50 text-teal-600 border-teal-200">
                      Online
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" /> {p.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="size-3" /> {p.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" /> {p.createdAt}
                    </div>
                  </div>
                </div>
              ))}

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

export default AvailablePharmacies;