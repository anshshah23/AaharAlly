"use client";
import { useEffect, useState } from "react";

function AgeModal() {
  const [age, setAge] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const diseases = [
    { label: "Diabetes", value: "Diabetes" },
    { label: "Hypoglycemia", value: "Hypoglycemia" },
    { label: "Gastroparesis", value: "Gastroparesis" },
    { label: "Pregnancy", value: "Pregnancy" },
    { label: "IBS", value: "IBS" },
    { label: "Peptic Ulcer", value: "Peptic Ulcer" },
    { label: "Hyperthyroidism", value: "Hyperthyroidism" },
    { label: "Kidney Disease", value: "Kidney Disease" },
    { label: "Cystic Fibrosis", value: "Cystic Fibrosis" },
    { label: "Addison's Disease", value: "Addison's Disease" },
    { label: "Eating Disorders", value: "Eating Disorders" },
    { label: "Liver Disease", value: "Liver Disease" },
    { label: "Metabolic Disorders", value: "Metabolic Disorders" },
    { label: "Post-Surgery", value: "Post-Surgery" },
  ];

  // Check session storage to see if modal has been shown today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = sessionStorage.getItem("lastVisit");
    if (lastVisit !== today) {
      setIsModalOpen(true);
      sessionStorage.setItem("lastVisit", today);
    }
  }, []);

  const handleAgeSubmit = () => {
    if (age && selectedDisease) {
      console.log(`User's age: ${age}, Disease: ${selectedDisease}`);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Enter Your Details
              <button onClick={() => setIsModalOpen(false)} className="float-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </h2>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded-xl p-2 w-full mb-4"
              placeholder="Your age"
            />
            <select
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
              className="border rounded-xl p-2 w-full mb-4"
            >
              <option value="">Select a condition (if applicable)</option>
              {diseases.map((disease) => (
                <option key={disease.value} value={disease.value}>
                  {disease.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAgeSubmit}
              className="bg-redCustom text-white p-2 rounded-xl hover:bg-orangeCustom transition duration-300 w-full"
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
