import { Check, Crown, Sparkles, Zap } from "lucide-react";
import axios from "axios";

import { toast } from "sonner";
import Backend_URL from "@/utils/constant";

const Payment = () => {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "Rs. 499",
      duration: "/ month",
      icon: Zap,
      badge: "Starter",
      description: "Best for normal users searching medicine availability.",
      features: [
        "100 medicine search messages",
        "Nearby pharmacy availability",
        "Basic AI medicine assistance",
        "Chat history access",
        "Email support",
      ],
      buttonText: "Choose Basic",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "Rs. 999",
      duration: "/ month",
      icon: Sparkles,
      badge: "Most Popular",
      description: "Perfect for frequent users who need faster medicine search.",
      features: [
        "Unlimited medicine search messages",
        "Priority AI responses",
        "Real-time nearby pharmacy stock",
        "Save favorite pharmacies",
        "Fast customer support",
      ],
      buttonText: "Choose Pro",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "Rs. 1,999",
      duration: "/ month",
      icon: Crown,
      badge: "Advanced",
      description: "For power users, clinics, and pharmacy-related workflows.",
      features: [
        "Everything in Pro",
        "Advanced AI medicine suggestions",
        "Medicine availability alerts",
        "Doctor/pharmacy contact support",
        "Premium priority support",
      ],
      buttonText: "Choose Premium",
      popular: false,
    },
  ];

  const handleBuyPlan = async (planId) => {
    try {
      const res = await axios.post(
        `${Backend_URL}/payment/create-checkout`,
        { plan: planId },
        { withCredentials: true }
      );

      if (res?.data?.checkoutURL) {
        window.location.href = res.data.checkoutURL;
      } else {
        toast.error("Checkout URL not found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Payment start failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            <Sparkles size={16} />
            AI Powered Medicine Availability System
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Upgrade Your Medicine Search
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            You can send 10 free messages by default. After that, choose a
            subscription plan to continue using AI-powered medicine availability
            search.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-teal-500 ring-4 ring-teal-100"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                    Recommended
                  </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-teal-600 text-white"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    <Icon size={28} />
                  </div>

                  <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                    {plan.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>

                <p className="mt-2 min-h-[50px] text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm font-medium text-gray-500">
                    {plan.duration}
                  </span>
                </div>

                <div className="mt-7 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                        <Check size={14} />
                      </span>
                      <p className="text-sm font-medium text-gray-700">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleBuyPlan(plan.id)}
                  className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-teal-600 text-white shadow-lg hover:bg-teal-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-teal-200 bg-white/80 p-6 text-center shadow-md backdrop-blur">
          <h3 className="text-lg font-bold text-gray-900">
            Free Trial Included
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Every user gets 10 free AI messages to check medicine availability
            before purchasing any subscription.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Payment;