import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  closeLoading,
  showError,
  showLoading,
  showSuccess,
} from "../../utils/toast";

const Subscription_Page = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const subscriptionPlans = [
    {
      name: "Gold",
      price: 29,
      originalPrice: 49,
      emoji: "👑",
      features: [
        "Basic Career Assessment",
        "5 Resume Reviews per month",
        "Access to Job Board",
        "Email Support",
      ],
    },
    {
      name: "Platinum",
      price: 59,
      originalPrice: 99,
      emoji: "💎",
      popular: true,
      features: [
        "Advanced Career Assessment",
        "Unlimited Resume Reviews",
        "Premium Job Board Access",
        "Priority Email Support",
        "2 One-on-One Sessions/month",
        "LinkedIn Profile Optimization",
      ],
    },
    {
      name: "Diamond",
      price: 99,
      originalPrice: 149,
      emoji: "💍",
      features: [
        "Complete Career Transformation",
        "Unlimited Everything",
        "24/7 Priority Support",
        "Unlimited One-on-One Sessions",
        "Salary Negotiation Mastery",
        "Executive Coaching Sessions",
      ],
    },
  ];

  const handleSubscribe = async (planType) => {
    showLoading(`Processing ${planType} subscription...`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      closeLoading();
      showSuccess(
        `You've successfully subscribed to the ${planType.toUpperCase()} plan! Welcome aboard!`,
        "Subscription Successful"
      );
    } catch (error) {
      closeLoading();
      showError("Subscription failed. Please try again.", "Subscription Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1ECCE] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#331832] mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-[#694D75] mb-6">
            Start your career transformation today
          </p>
          <div className="inline-block bg-[#1B5299] text-[#F1ECCE] px-6 py-2 rounded-full font-semibold">
            🎉 New User Bonus: Up to 40% OFF!
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {subscriptionPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-[#9FC2CC] rounded-xl p-6 shadow-lg relative ${
                plan.popular ? "ring-4 ring-[#1B5299] scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#1B5299] text-[#F1ECCE] px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className="text-2xl font-bold text-[#331832] mb-4">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-[#331832]">
                  ${plan.price}
                  <span className="text-lg font-normal">/month</span>
                </div>
                <div className="text-sm text-[#694D75] line-through">
                  Was ${plan.originalPrice}/month
                </div>
                <div className="text-sm font-semibold text-green-600 mt-1">
                  Save ${plan.originalPrice - plan.price}/month
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-[#331832] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#1B5299] text-[#F1ECCE] hover:bg-[#0d4085]"
                    : "bg-[#694D75] text-[#F1ECCE] hover:bg-[#5a3f63]"
                } ${
                  isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
              >
                {isProcessing ? "Processing..." : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Simple Info Section */}
        <div className="bg-[#9FC2CC] rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#331832] mb-6 text-center">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-[#331832] mb-2">
                🎯 Expert Guidance
              </h3>
              <p className="text-[#694D75] text-sm">
                Professional career counselors with industry experience
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[#331832] mb-2">
                📈 Proven Results
              </h3>
              <p className="text-[#694D75] text-sm">
                90% success rate in landing dream jobs
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[#331832] mb-2">
                💰 Money-Back Guarantee
              </h3>
              <p className="text-[#694D75] text-sm">30-day risk-free trial</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[#331832] mb-2">
                🔄 Cancel Anytime
              </h3>
              <p className="text-[#694D75] text-sm">No long-term contracts</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-[#694D75] text-[#F1ECCE] px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription_Page;