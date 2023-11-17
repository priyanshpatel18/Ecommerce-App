import React from "react";

export default function Loader({ isLoading }) {
  return (
    <div className={`loader-container ${isLoading ? "visible" : "hidden"}`}>
      <div className="loader"></div>
    </div>
  );
}
