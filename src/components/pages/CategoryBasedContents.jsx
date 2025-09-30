import React, { useState, useEffect } from "react";
import Category from "../Category";
import { Link } from "react-router-dom";

const CategoryBasedContents = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content.json")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.careerServices);
        setFilteredServices(data.careerServices);
        setLoading(false);
      })
      .catch((error) => {

        setLoading(false);
      });
  }, []);

  // Get all categories
  const getCategories = () => {
    const categories = [
      ...new Set(services.map((service) => service.category)),
    ];
    return ["all", ...categories];
  };

  // Count services in each category
  const getServiceCounts = () => {
    const counts = { all: services.length };
    services.forEach((service) => {
      counts[service.category] = (counts[service.category] || 0) + 1;
    });
    return counts;
  };

  // Filter services when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((service) => service.category === category)
      );
    }
  };

  // Create star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-[#F1ECCE] py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {loading && (
          <div className="text-center py-20">
            <div className="text-2xl font-bold text-[#331832]">
              Loading services...
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* Category buttons */}
            <Category
              categories={getCategories()}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              serviceCounts={getServiceCounts()}
            />

            {/* Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#9FC2CC] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {/* Service image */}
                  <div className="h-48 bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Service details */}
                  <div className="p-6">
                    {/* Category and price */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-[#1B5299] text-[#F1ECCE] text-xs font-semibold rounded-full">
                        {service.category.toUpperCase()}
                      </span>
                      <span className="text-2xl font-bold text-[#331832]">
                        {service.pricing}
                      </span>
                    </div>

                    {/* Service name */}
                    <h3 className="text-xl font-bold text-[#331832] mb-2">
                      {service.serviceName}
                    </h3>

                    {/* Description */}
                    <p className="text-[#694D75] text-sm mb-4">
                      {service.description}
                    </p>

                    {/* Duration and date */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-[#331832]">
                        <span className="font-semibold mr-2">Duration:</span>
                        {service.duration}
                      </div>
                      <div className="flex items-center text-sm text-[#331832]">
                        <span className="font-semibold mr-2">Schedule:</span>
                        {service.dateTime}
                      </div>
                    </div>

                    {/* Counselor info */}
                    <div className="mb-4">
                      <div className="text-sm text-[#331832]">
                        <span className="font-semibold">Counselor:</span>{" "}
                        {service.counselor.name}
                      </div>
                      <div className="text-xs text-[#694D75]">
                        {service.counselor.experience} •{" "}
                        {service.counselor.specialization}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-2">
                        {renderStars(service.rating)}
                      </div>
                      <span className="text-sm text-[#694D75]">
                        {service.rating} ({service.totalReviews} reviews)
                      </span>
                    </div>

                    {/* Learn more button */}
                    <Link
                      to={`/details/content/${service.id}`}
                      className="w-full bg-[#1B5299] text-[#F1ECCE] py-3 px-4 rounded-lg font-semibold hover:bg-[#0d4085] transition-all duration-300 text-center block"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No services found message */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-2xl font-bold text-[#331832] mb-4">
                  No services found
                </div>
                <p className="text-[#694D75]">
                  Try selecting a different category
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryBasedContents;