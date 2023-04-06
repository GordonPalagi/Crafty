import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";
import Navbar from "./Navbar";
import * as FaIcons from "react-icons/fa";

const Layout = (props) => {
  return (
    <div id="layout">
      <Header />
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
