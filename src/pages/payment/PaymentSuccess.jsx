import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 const rawOrderId = searchParams.get("orderId");
const orderId = rawOrderId?.split("?")[0]?.trim();

useEffect(() => {
  const verifyPayment = async () => {
    try {
      console.log("Raw orderId:", rawOrderId);
      console.log("Clean orderId:", orderId);

      if (!orderId) {
        toast.error("Order ID not found");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${Backend_URL}/payment/verify-success`,
        { orderId },
        { withCredentials: true }
      );

      toast.success(res?.data?.message || "Subscription activated");
      setLoading(false);

      setTimeout(() => {
        navigate("/feed");
      }, 2000);
    } catch (error) {
      console.log("Verify payment error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Payment verification failed");
      setLoading(false);
    }
  };

  verifyPayment();
}, [orderId, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-9 w-9 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          {loading ? "Verifying Payment..." : "Payment Successful"}
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          {loading
            ? "Please wait while we activate your subscription."
            : "Your subscription is active. You can continue sending messages."}
        </p>

        <button
          onClick={() => navigate("/feed")}
          className="mt-6 w-full rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;