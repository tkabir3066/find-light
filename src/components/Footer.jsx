import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer sm:footer-horizontal p-10"
      style={{ backgroundColor: "#331832", color: "#F1ECCE" }}
    >
      <nav>
        <h6 className="footer-title text-[#F1ECCE]">Services</h6>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Branding
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Design
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Marketing
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Advertisement
        </a>
      </nav>

      <nav>
        <h6 className="footer-title text-[#F1ECCE]">Company</h6>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          About us
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Contact
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Jobs
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Press kit
        </a>
      </nav>

      <nav>
        <h6 className="footer-title text-[#F1ECCE]">Legal</h6>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Terms of use
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Privacy policy
        </a>
        <a className="link link-hover text-[#9FC2CC] hover:text-[#F1ECCE]">
          Cookie policy
        </a>
      </nav>

      <form>
        <h6 className="footer-title text-[#F1ECCE]">Newsletter</h6>
        <fieldset className="w-80">
          <label className="text-[#9FC2CC]">Enter your email address</label>
          <div className="join mt-2">
            <input
              type="text"
              placeholder="username@site.com"
              className="input join-item bg-white border border-[#9FC2CC] text-black"
            />
            <button
              className="btn join-item border-0"
              style={{ backgroundColor: "#1B5299", color: "#F1ECCE" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#694D75")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1B5299")
              }
            >
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
