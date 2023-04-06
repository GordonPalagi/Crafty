import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import "./home.css";
import React from "react";

const Dummy_Data = [
  {
    img: img1,
    title: "Crafty's Curated Beer Selection",
    info: "Discover hundreds of intricately crafted beer from your favorite breweries",
  },
  {
    img: img2,
    title: "Brewery Selection",
    info: "The most exciting breweries are closer than you think",
  },
  {
    img: img3,
    title: "Upcoming Events and News",
    info: "Follow breweries for more news and upcoming events",
  },
];
const Home = () => {
  const [index, setIndex] = useState(0);
  const changeLeft = () => {
    if (index === 0) {
      setIndex(Dummy_Data.length - 1);
    } else setIndex((index) => index - 1);
  };

  const changeRight = () => {
    if (index === Dummy_Data.length - 1) {
      setIndex(0);
    } else setIndex((index) => index + 1);
  };
  useEffect(() => {
    const timer = setTimeout(() => changeRight(), 4000);
    return () => clearTimeout(timer);
  }, [index]);
  return (
    <section className="home">
      {/* <p className="title">Welcome to our Brewery {"&"} Beer finding app</p> */}
      <div className="container">
        <div className="browser">
          <img src={Dummy_Data[index].img} className="image-b" />
          <div className="detailss">
            <h2>{Dummy_Data[index].title}</h2>
            <p> {Dummy_Data[index].info}</p>
          </div>
          <span className="to-left" onClick={changeLeft}>
            <FaIcons.FaAngleDoubleLeft />
          </span>
          <span className="to-right" onClick={changeRight}>
            <FaIcons.FaAngleDoubleRight />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Home;
