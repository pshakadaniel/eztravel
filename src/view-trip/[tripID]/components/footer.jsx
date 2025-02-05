import React from "react";

function footer() {
  return (
    <div>
      <div className="flex justify-between items-center mt-8 text-gray-400">
        <div className="flex gap-4">
          <a href="/">Home</a>
          <a href="/create-trip">Create Trip</a>
        </div>
        <div className="font-semibold text-gray-400">
          © 2025 EZ TRAVEL by Daniel Pyae
        </div>
      </div>
    </div>
  );
}

export default footer;
