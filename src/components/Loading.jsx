import React from "react";

export default function Loading({ selector, hidden = false }) {
  return (
    <div
      id={selector}
      className="loading position-absolute top-0 bottom-0 start-0 end-0 position-relative"
      style={hidden ? { display: "none" } : {}}
    >
      <div className="spinner position-absolute top-50 start-50 translate-middle">
        <i className="fa-solid fa-circle-notch fa-spin fa-4x"></i>
      </div>
    </div>
  );
}
