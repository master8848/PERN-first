import React from "react";
import { Route, Routes } from "react-router-dom";
import MainComponent from "../component/MainComponent";
import AddCountries from "../pages/AddCountries";
import Countries from "../pages/Countries";
import Country from "../pages/Country";
import UpdateCountries from "../pages/UpdateCountries";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainComponent />}>
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/view/:id" element={<Country />} />
        <Route path="/countries/edit/:id" element={<UpdateCountries />} />
        <Route path="/add" element={<AddCountries />} />
      </Route>
    </Routes>
  );
}
