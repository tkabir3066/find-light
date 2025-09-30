import React from "react";

const Category = ({
  categories = [],
  activeCategory = "all",
  onCategoryChange = () => {},
  serviceCounts = {},
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#9FC2CC] p-6 rounded-xl mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-[#331832] mb-6 text-center">
        Our Services
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#1B5299] text-[#F1ECCE] shadow-lg scale-105"
                : "bg-[#694D75] text-[#F1ECCE] hover:bg-[#1B5299] hover:scale-105"
            }`}
          >
            {category === "all"
              ? "All Services"
              : category.charAt(0).toUpperCase() + category.slice(1)}
            <span className="ml-2 text-sm opacity-80">
              ({serviceCounts[category] || 0})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;