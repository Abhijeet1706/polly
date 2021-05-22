import React from "react";

const PageLoader = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen">
      <h1 className="animate-spin text-lg leading-5">Please Wait</h1>
    </div>
  );
};

export default PageLoader;
