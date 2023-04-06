import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Breweries from "./pages/content/Breweries";
import SingleBrewery from "./pages/content/SingleBrewery";
import Uploader from "./Uploader";
import Beers from "./pages/content/Beers";
import BeersPage from "./pages/content/BeersPage";
import BrewerPage from "./pages/content/admin-brewer/BrewerPage";
import SingleBeer from "./pages/content/SingleBeer";
import TastingJournal from "././components/Ui/Tastingjournal/TastingJournal.js";
import NewBrewery from "./components/content/breweries/NewBrewery";
import UserProfile from "./pages/content/UserProfile";
import BeerShowPage from "./pages/content/extra/BeerShowPage";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* Uploader is just a page where We try things---- you can ignore it if you want */}
        <Route path="/uploader" element={<Uploader />}></Route>
        {/* Uploader is just a page where We try things---- you can ignore it if you want */}
        <Route path="/breweries" element={<Breweries />}></Route>
        <Route path="/breweries/:breweryId" element={<SingleBrewery />}></Route>
        <Route path="/beers" element={<BeersPage />}></Route>
        {/* <Route path="/beers/:beerId" element={<SingleBeer />}></Route> */}
        <Route path="/tastingjournal" element={<TastingJournal />}></Route>
        <Route path="/become-brewer" element={<NewBrewery />}></Route>
        <Route path="/UserProfile" element={<UserProfile />}></Route>
        <Route path="/profile/" element={<Profile />}></Route>
        <Route path="/brewer-dashboard" element={<BrewerPage />}></Route>
        <Route path="/beers/:beerId" element={<BeerShowPage />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
