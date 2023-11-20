import React from "react";

export default function Loader({ isLoading }) {
  return (
    <div className={`loaderContainer ${isLoading ? "visible" : "hidden"}`}>
      <div className="loader"></div>
    </div>
  );
}
