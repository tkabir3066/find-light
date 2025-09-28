import React from "react";

const Hero = () => {
  return (
    <section
      className="p-3 flex flex-col justify-center items-center text-center px-6"
      style={{ backgroundColor: "#F1ECCE" }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#331832]">
        Find Your Path. <br /> Shape Your Future.
      </h1>

      <p className="text-lg md:text-xl max-w-2xl mb-8 text-[#694D75]">
        At <span className="font-semibold">Find Light</span>, we guide students
        and professionals to discover their true potential, make informed career
        choices, and achieve their dreams.
      </p>

      <div className="carousel w-full md:w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/man-being-interviewed-indoors-by-journalist_23-2149029359.jpg"
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <a
              href="#slide3"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/high-angle-coworkers-collaboration-office_23-2148339365.jpg"
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <a
              href="#slide1"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/proud-businesswoman-explaining-her-plan_1098-3418.jpg"
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <a
              href="#slide2"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle bg-white/80 hover:bg-white"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
