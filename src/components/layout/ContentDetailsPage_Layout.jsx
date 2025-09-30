import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ContentDetailsPage_Layout = () => {
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

export default ContentDetailsPage_Layout;
