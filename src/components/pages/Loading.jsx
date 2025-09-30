import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col md:w-11/12 lg:w-4/5 mx-auto">
      <header>
        <Navbar />
      </header>
    
      <main className="flex-grow flex justify-center items-center bg-[#F1ECCE]">
        <span className="loading loading-spinner loading-xl"></span>
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Loading;
