import "./navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import React from "react";

import { IconContext } from "react-icons";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const sideBarToggle = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <IconContext.Provider value={{ className: "navbar-icon" }}>
      <div className="sidebar">
        <ul className="toggle-icon">
          <li>
            {!sidebar ? (
              <FaIcons.FaBars onClick={sideBarToggle} />
            ) : (
              <AiIcons.AiOutlineClose onClick={sideBarToggle} />
            )}
          </li>
        </ul>
        <div className={sidebar ? "sidebar side-active" : "sidebar non-active"}>
          {sidebar && (
            <ul className="sidebar-menu">
              <Link to="/">
                <li>
                  <span>
                    <FaIcons.FaBeer />
                  </span>
                  <span>home</span>
                </li>
              </Link>

              <li>
                <Link to="/breweries">
                  <span>
                    <FaIcons.FaGlassCheers />
                  </span>
                  <span> Breweries</span>
                </Link>
              </li>
              <li>
                <Link to="/beers">
                  <span>
                    <FaIcons.FaGlassCheers />
                  </span>
                  <span> Beers</span>
                </Link>
              </li>
              <li>
                <Link to="/tastingjournal">
                  <span>
                    <FaIcons.FaGlassCheers />
                  </span>
                  <span>Tasting Journal</span>
                </Link>
              </li>
              <li>
                <Link to="/UserProfile">
                  <span>
                    <FaIcons.FaGlassCheers />
                  </span>
                  <span>User Profile</span>
                </Link>
              </li>
              <li>
                <span>
                  <FaIcons.FaLocationArrow />
                </span>
                <span>Favorit Breweries</span>
              </li>
              <li>
                <span>
                  <FaIcons.FaNewspaper />
                </span>
                <span>Favorit Beers</span>
              </li>

              {currentUser && (
                <Link to="/become-brewer">
                  <li>
                    <span>
                      <FaIcons.FaNewspaper />
                    </span>
                    <span>Become A brewer</span>
                  </li>
                </Link>
              )}
            </ul>
          )}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Navbar;
