import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FeedbackSection from "../FeedbackSection";
import { showBookingSuccess, showConfirm } from "../../utils/toast";

const ContentDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load service data when component starts
  useEffect(() => {
    fetch("/content.json")
      .then((response) => response.json())
      .then((data) => {
        const foundService = data.careerServices.find(
          (s) => s.id === parseInt(id)
        );
        setService(foundService);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-xl">
          ★
        </span>
      );
    }
    return stars;
  };


  const handleBookService = async () => {
    const result = await showConfirm(
      `Book "${service.serviceName}" for ${service.pricing}?`,
      "Confirm Booking"
    );

    if (result.isConfirmed) {
      setTimeout(() => {
        showBookingSuccess(service.serviceName);
      }, 1000);
    }
  };

useEffect(() => {
  if (service && service.serviceName) {
    document.title = `Find Light | ${service.serviceName}`;
  }
}, [service]);


  return (
    <div className="bg-[#F1ECCE]">

      <div className="max-w-4xl mx-auto my-3">
        {/* Show loading message */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-2xl font-bold text-[#331832]">Loading...</div>
          </div>
        )}

        {!loading && !service && (
          <div className="text-center py-20">
            <div className="text-2xl font-bold text-red-600 mb-4">
              Service Not Found
            </div>
            <Link
              to="/"
              className="bg-[#1B5299] text-[#F1ECCE] px-6 py-3 rounded-lg hover:bg-[#0d4085] transition-all duration-300"
            >
              Back to Services
            </Link>
          </div>
        )}

        {!loading && service && (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-[#1B5299] hover:text-[#0d4085] transition-all duration-300 cursor-pointer "
              >
                <span className="text-xl">←</span>
                <span className="font-semibold">Back to Services</span>
              </button>
            </div>

            {/* Main Card */}
            <div className="bg-[#9FC2CC] rounded-md overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-black/50">
                  <div className="p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-[#1B5299] text-[#F1ECCE] text-xs font-semibold rounded-full uppercase">
                        {service.category}
                      </span>
                      <div className="flex items-center">
                        {renderStars(service.rating)}
                        <span className="ml-2 text-sm">
                          {service.rating} ({service.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {service.serviceName}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left side - Service info */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div>
                      <h2 className="text-2xl font-bold text-[#331832] mb-4">
                        About This Service
                      </h2>
                      <p className="text-[#694D75] text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-[#331832] mb-4">
                        What's Included
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-green-500 text-lg">✓</span>
                            <span className="text-[#331832]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Counselor */}
                    <div>
                      <h3 className="text-xl font-bold text-[#331832] mb-4">
                        Your Counselor
                      </h3>
                      <div className="bg-[#F1ECCE] p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-[#331832]">
                          {service.counselor.name}
                        </h4>
                        <p className="text-[#694D75] mb-2">
                          {service.counselor.specialization}
                        </p>
                        <p className="text-sm text-[#694D75]">
                          <strong>Experience:</strong>{" "}
                          {service.counselor.experience}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-xl font-bold text-[#331832] mb-4">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#694D75] text-[#F1ECCE] text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Booking card */}
                  <div className="lg:col-span-1">
                    <div className="bg-[#F1ECCE] p-6 rounded-xl shadow-lg sticky top-8">
                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[#331832] mb-2">
                          {service.pricing}
                        </div>
                        <div className="text-[#694D75]">per session</div>
                      </div>

                      {/* Details */}
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#331832]">
                            Duration:
                          </span>
                          <span className="text-[#694D75]">
                            {service.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-[#331832]">
                            Date & Time:
                          </span>
                          <span className="text-[#694D75]">
                            {service.dateTime}
                          </span>
                        </div>

                        {/* Location (only for offline services) */}
                        {service.location && (
                          <div className="flex justify-between">
                            <span className="font-semibold text-[#331832]">
                              Location:
                            </span>
                            <span className="text-[#694D75] text-sm">
                              {service.location}
                            </span>
                          </div>
                        )}

                        {/* Group info (only for group services) */}
                        {service.maxParticipants && (
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold text-[#331832]">
                                Participants:
                              </span>
                              <span className="text-[#694D75]">
                                {service.currentParticipants}/
                                {service.maxParticipants}
                              </span>
                            </div>
                            <div className="w-full bg-[#9FC2CC] rounded-full h-2">
                              <div
                                className="bg-[#1B5299] h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${
                                    (service.currentParticipants /
                                      service.maxParticipants) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Book button */}
                      <button
                        onClick={handleBookService}
                        className="w-full bg-[#1B5299] text-[#F1ECCE] py-3 px-4 rounded-lg font-semibold hover:bg-[#0d4085] transition-all duration-300"
                      >
                        Book This Service
                      </button>

                      <div className="text-center mt-4">
                        <p className="text-xs text-[#694D75]">
                          Free cancellation up to 24 hours before the session
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-8">
              <FeedbackSection
                serviceId={service.id}
                serviceName={service.serviceName}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;