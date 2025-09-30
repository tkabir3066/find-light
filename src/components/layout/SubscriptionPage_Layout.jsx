import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useEffect } from "react";


const SubscriptionPage_layout = () => {
    useEffect(() => {
    document.title = "Gadget Heaven | Subscription";
  }, []);
  return (
    <div className="md:w-11/12 lg:w-4/5 mx-auto">
      <header>
        <Navbar></Navbar>
      </header>
      <section>
        <Outlet></Outlet>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default SubscriptionPage_layout;
