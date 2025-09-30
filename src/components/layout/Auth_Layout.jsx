import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Auth_layout = () => {
  return (
    <div className="md:w-11/12 lg:w-4/5 mx-auto">
      <header>
        <Navbar></Navbar>
      </header>
      <Outlet></Outlet>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Auth_layout;