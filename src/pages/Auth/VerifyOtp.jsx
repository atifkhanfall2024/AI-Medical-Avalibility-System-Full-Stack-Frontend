import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import Backend_URL from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const inputsRef = useRef([]);


  const navigate = useNavigate()

  // ⏱️ Countdown Timer (FIXED)
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ⌨️ Handle input change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ⌨️ Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ⏱️ Format time
  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // 📩 Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      return toast.error("Please enter complete OTP");
    }

    try {
      const res = await axios.post(
        `${Backend_URL}/Verifyemail`,
        { otp: finalOtp },
        { withCredentials: true }
      );

      toast.success(res?.data?.message || "OTP Verified Successfully");
      navigate('/login')

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  // 🔄 Resend OTP (FIXED timer reset)
  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(120);
    inputsRef.current[0]?.focus();
    toast.success("OTP resent successfully");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xl text-center">

          <h1 className="text-2xl font-semibold text-gray-900">
            Verify OTP
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between mt-6 gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          {/* Timer */}
          <p className="mt-4 text-sm text-gray-500">
            Time remaining:{" "}
            <span className="font-medium text-gray-700">
              {formatTime()}
            </span>
          </p>

          {/* Submit */}
          <Button
            className="w-full mt-6 h-11 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>

          {/* Resend */}
          <p className="mt-4 text-sm text-gray-500">
            Didn’t receive code?{" "}
            <button
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`font-medium ${
                timeLeft > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-500 hover:underline"
              }`}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyOtp;