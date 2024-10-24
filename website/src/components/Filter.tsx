"use client";
import React, { useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import "tailwindcss/tailwind.css";

interface DropdownItem {
  label: string;
  selected: boolean;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  onToggle: (index: number) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  reset: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  onToggle,
  isOpen,
  toggleOpen,
}) => {
  const selectedCount = items.filter((item) => item.selected).length;
  return (
    <div className="mb-3 relative">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full min-h-[3rem] rounded-md bg-gray-100 px-4 py-2 text-gray-800 gap-2 focus:outline-none"
      >
        {title}{" "}
        {selectedCount > 0 && (
          <span className="text-green-500">({selectedCount} selected)</span>
        )}
        <FaAngleDown
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-fit mt-2 bg-white border rounded-lg shadow-lg transition-all">
          {items.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onToggle(index)}
                className={`flex justify-between w-full px-4 py-2 text-left gap-2 hover:bg-gray-200 ${
                  item.selected ? "bg-green-50 text-green-500" : ""
                }`}
              >
                {item.label}
                {item.selected && <FaCheck className="text-green-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Filters: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [typeItems, setTypeItems] = useState<DropdownItem[]>([
    { label: "Phone calls", selected: false },
    { label: "Appointments", selected: false },
    { label: "Email", selected: false },
    { label: "Tasks", selected: false },
    { label: "Letters", selected: false },
    { label: "Campaign Response", selected: false },
  ]);

  const [statusItems, setStatusItems] = useState<DropdownItem[]>([
    { label: "Open", selected: false },
    { label: "Scheduled", selected: false },
    { label: "Completed", selected: false },
    { label: "Cancelled", selected: false },
  ]);

  const handleToggle = (
    index: number,
    items: DropdownItem[],
    setItems: React.Dispatch<React.SetStateAction<DropdownItem[]>>
  ) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    setItems(newItems);
  };

  const handleReset = () => {
    setTypeItems(typeItems.map((item) => ({ ...item, selected: false })));
    setStatusItems(statusItems.map((item) => ({ ...item, selected: false })));
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-row items-center justify-end w-full max-w-2xl mx-auto gap-4">
      <Dropdown
        title="Type"
        items={typeItems}
        isOpen={openDropdown === 0}
        toggleOpen={() => setOpenDropdown(openDropdown === 0 ? null : 0)}
        onToggle={(index) => handleToggle(index, typeItems, setTypeItems)}
        reset={handleReset}
      />
      <Dropdown
        title="Status"
        items={statusItems}
        isOpen={openDropdown === 1}
        toggleOpen={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
        onToggle={(index) => handleToggle(index, statusItems, setStatusItems)}
        reset={handleReset}
      />
      <div className="mb-3 relative">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
