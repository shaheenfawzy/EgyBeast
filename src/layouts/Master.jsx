import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/master.css";

export default function Master() {
  return (
    <>
      <NavBar />
      <div className="container-w-90 pt-5">
        <Outlet />
      </div>
    </>
  );
}
