import { useEffect } from "react";
import { XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { toast } from "sonner";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const cancelPayment = async () => {
      try {
        if (!orderId) return;

        await axios.post(
          `${Backend_URL}/payment/cancel`,
          { orderId },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    };

    cancelPayment();
  }, [orderId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-9 w-9 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          Your payment was cancelled. You can try again anytime.
        </p>

        <button
          onClick={() => navigate("/payment")}
          className="mt-6 w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;