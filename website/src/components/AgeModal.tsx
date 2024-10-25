"use client";
import { useEffect, useState } from "react";

function AgeModal() {
  const [age, setAge] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check local storage to see if age has already been entered
  useEffect(() => {
    const hasEnteredAge = localStorage.getItem("hasEnteredAge");
    if (!hasEnteredAge) {
      setIsModalOpen(true);
    }
  }, []);

  const handleAgeSubmit = () => {
    if (age) {
      console.log(`User's age is: ${age}`);
      localStorage.setItem("hasEnteredAge", "true"); // Set flag in local storage
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Your Age</h2>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded p-2 w-full mb-4"
              placeholder="Your age"
            />
            <button
              onClick={handleAgeSubmit}
              className="bg-orangeCustom text-white p-2 rounded hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AgeModal;
