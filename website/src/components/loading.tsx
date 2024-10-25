import React from "react";

function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center mt-16 bg-white h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="lg:h-6 lg:w-6 h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="lg:h-6 lg:w-6 h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="lg:h-6 lg:w-6 h-4 w-4 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}

export default Loading;
