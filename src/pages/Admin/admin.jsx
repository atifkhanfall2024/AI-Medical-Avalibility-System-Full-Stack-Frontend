import { useEffect, useState } from "react";
import {
  Card, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  Store, ShieldCheck, Clock,
  CheckCircle2, XCircle,
  MapPin, Phone, Eye, Activity
} from "lucide-react";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import getAddress from "@/utils/geocoding";

const pharmaciesData = [
  {
    id: "P-1042",
    name: "GreenCare Pharmacy",
    owner: "Ahmed Khan",
    phone: "+92 300 1234567",
    location: "Lahore, Gulberg",
    time: "2 hours ago",
    img: "https://via.placeholder.com/100",
    status: "pending",
  },
  {
    id: "P-1040",
    name: "City Drug Store",
    owner: "Hassan Ali",
    phone: "+92 333 4455667",
    location: "Islamabad, F-7",
    time: "1 day ago",
    img: "https://via.placeholder.com/100",
    status: "pending",
  },
];

const adminsData = [
  {
    id: "A-208",
    name: "Dr. Bilal Ahmad",
    email: "bilal@amas.health",
    role: "Regional Admin",
    time: "3 hours ago",
    status: "pending",
  },
  {
    id: "A-207",
    name: "Fatima Zahra",
    email: "fatima@amas.health",
    role: "Support Admin",
    time: "1 day ago",
    status: "pending",
  },
];

const activities = [
  { text: "GoodHealth Pharmacy was approved", time: "10 min ago", type: "ok" },
  { text: "Admin: Zara Sheikh was approved", time: "1 hour ago", type: "ok" },
  { text: "QuickMeds Store was rejected (invalid license)", time: "3 hours ago", type: "bad" },
  { text: "Admin: Imran Q. was approved", time: "Yesterday", type: "ok" },
];

const LicensePreview = ({ src }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="flex items-center gap-2 border px-2 py-1 rounded-lg hover:bg-gray-50">
        <img src={src} className="w-10 h-10 rounded-md" />
        <span className="text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" /> View
        </span>
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>License Preview</DialogTitle>
      </DialogHeader>
      <img src={src} className="w-full rounded-lg" />
    </DialogContent>
  </Dialog>
);

export default function Admin() {
  const [query, setQuery] = useState("");
const [addresses, setAddresses] = useState({});
const pharma = useSelector((store)=>store?.pharmacy)||[]
console.log('pharmacy ' , pharma);
useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const promises = pharma.map(async (p) => {
        const coords = p?.Location?.coordinates;

        if (Array.isArray(coords) && coords.length === 2) {
          const [lng, lat] = coords;

          try {
            const address = await getAddress(lat, lng);
            return { id: p._id, address };
          } catch {
            return { id: p._id, address: "Unknown location" };
          }
        }

        return { id: p._id, address: "Invalid coords" };
      });

      const results = await Promise.all(promises);

      const addressMap = {};
      results.forEach((item) => {
        addressMap[item.id] = item.address;
      });

      setAddresses(addressMap);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  if (pharma?.length) {
    fetchAddresses();
  }
}, [pharma]);

//console.log('pharmacy' , pharma);


  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="font-semibold text-lg">AMAS Medical</h1>

        <Input
          placeholder="Search patients, records..."
          className="max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white">
          A
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* TITLE */}
        <h2 className="text-3xl font-bold">Pending Approvals</h2>
        <p className="text-gray-500 mb-6">
          Review and approve new pharmacy registrations and admin requests.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pending Requests", value: 7, icon: Clock },
            { label: "Approved (Month)", value: 48, icon: CheckCircle2 },
            { label: "Active Pharmacies", value: 1247, icon: Store },
            { label: "Total Admins", value: 14, icon: ShieldCheck },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-3 p-4">
                <s.icon className="text-teal-500" />
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="font-semibold text-lg">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TABS */}
        <Tabs defaultValue="pharmacies">

          <TabsList className="mb-4">
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>

          {/* PHARMACIES */}
          <TabsContent value="pharmacies">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pharmacy</TableHead>
                    <TableHead>Owner & Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
<TableBody>
  {pharma.length > 0 ? (
    pharma.map((p) => (
      <TableRow key={p._id}>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-teal-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
              {p?.FullName?.[0]}
            </div>
            <div>
              <p className="font-medium">{p?.FullName}</p>
            </div>
          </div>
        </TableCell>

        <TableCell>
          <p>{p?.FullName}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Phone className="w-3 h-3" /> {p?.PhoneNumber}
          </p>
        </TableCell>

        <TableCell className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {addresses[p._id]  || "Loading..."}
        </TableCell>

        <TableCell>
          <LicensePreview src={"img"} />
        </TableCell>

        <TableCell>
          <Badge>Pending</Badge>
        </TableCell>

        <TableCell className="flex gap-2">
          <Button size="sm" className="bg-teal-500">
            Approve
          </Button>
          <Button size="sm" variant="outline">
            <XCircle className="w-4 h-4 text-red-500" />
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} className="text-center">
        No pharmacies found
      </TableCell>
    </TableRow>
  )}
</TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* ADMINS */}
          <TabsContent value="admins">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {adminsData.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <p className="font-medium">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.id}</p>
                      </TableCell>

                      <TableCell>{a.email}</TableCell>
                      <TableCell>{a.role}</TableCell>

                      <TableCell>
                        <Badge>Pending</Badge>
                      </TableCell>

                      <TableCell className="flex gap-2">
                        <Button size="sm" className="bg-teal-500">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

        </Tabs>

        {/* RECENT ACTIVITY */}
        <Card className="mt-6">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Recent Activity
            </h3>

            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {a.type === "ok" ? (
                      <CheckCircle2 className="text-green-500 w-4 h-4" />
                    ) : (
                      <XCircle className="text-red-500 w-4 h-4" />
                    )}
                    {a.text}
                  </div>
                  <span className="text-gray-400">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}