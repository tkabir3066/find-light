import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/man-being-interviewed-indoors-by-journalist_23-2149029359.jpg",
      title: "Career Counseling",
      description: "One-on-one guidance to discover your ideal career path",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-photo/high-angle-coworkers-collaboration-office_23-2148339365.jpg",
      title: "Professional Development",
      description: "Enhance your skills and advance in your career",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-photo/proud-businesswoman-explaining-her-plan_1098-3418.jpg",
      title: "Interview Preparation",
      description: "Ace your next interview with expert coaching",
    },
  ];

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

      {/* Swiper Slider */}
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ height: "400px" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8 text-white text-left">
                  <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm opacity-90">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev !w-10 !h-10 !text-white after:!text-sm !bg-white/20 !rounded-full backdrop-blur-sm hover:!bg-white/30 transition-all"></div>
          <div className="swiper-button-next !w-10 !h-10 !text-white after:!text-sm !bg-white/20 !rounded-full backdrop-blur-sm hover:!bg-white/30 transition-all"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;