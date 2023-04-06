import React from "react";
const BreweryContext = React.createContext({
  brewery: "",
  setBrewery: () => {},
  breweryImageFromLocal: "",
  breweryIsFromLocal: "",
  tempImageObject: null,
  breweryBrewers: [],
});

export default BreweryContext;
