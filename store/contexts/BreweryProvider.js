import { useState } from "react";
import BreweryContext from "./BreweryContext";

const BreweryProviver = (props) => {
  const [data, setData] = useState([]);
  const setBrewerToContext = (brew) => {
    setData(brew);
  };

  const breweryContext = {
    brewery: data,
    setBrewery: setBrewerToContext,
    breweryImageFromLocal: "",
    breweryIsFromLocal: false,
    tempImageObject: null,
    breweryBrewers: [],
  };
  return (
    <BreweryContext.Provider value={breweryContext}>
      {props.children}
    </BreweryContext.Provider>
  );
};

export default BreweryProviver;
