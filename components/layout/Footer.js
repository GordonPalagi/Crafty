import "./footer.css";
import * as FaIcons from "react-icons/fa";
import React from "react"

const Footer = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <p>All rights are reserved 2022 - capstone 2022 team n= 20</p>
      <p onClick={scrollUp}>
        <span>
          <FaIcons.FaArrowUp />
        </span>
        <span>SCROLL UP</span>
      </p>
    </footer>
  );
};
export default Footer;
