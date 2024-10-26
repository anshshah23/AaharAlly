"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="mb-3 relative text-sm">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full min-h-[3rem] rounded-md bg-gray-100 px-2 py-2 text-gray-800 gap-2 focus:outline-none"
      >
        {title}{" "}
        {selectedCount > 0 && (
          <span className="text-green-500">({selectedCount})</span>
        )}
        <FaAngleDown
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full max-h-40 mt-2 bg-white border rounded-lg shadow-lg transition-all overflow-y-scroll z-40">
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
  const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([
    { label: "Vegan", selected: false },
    { label: "Dessert", selected: false },
    { label: "Street Food", selected: false },
    { label: "Spicy", selected: false },
    { label: "Cheesy", selected: false },
    { label: "Chinese", selected: false },
    { label: "Indian Curry", selected: false },
    { label: "Snacks", selected: false },
    { label: "Seafood", selected: false },
    { label: "Healthy", selected: false },
  ]);

  const [regionItems, setRegionItems] = useState<DropdownItem[]>([
    { label: "Tamil Nadu", selected: false },
    { label: "Punjab", selected: false },
    { label: "Kerala", selected: false },
    { label: "Rajasthan", selected: false },
    { label: "Maharashtra", selected: false },
    { label: "Uttar Pradesh", selected: false },
    { label: "West Bengal", selected: false },
    { label: "Gujarat", selected: false },
    { label: "Karnataka", selected: false },
    { label: "Andhra Pradesh", selected: false },
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const selectedCategories = categoryItems
      .filter((item) => item.selected)
      .map((item) => item.label)
      .join(",");
    const selectedRegions = regionItems
      .filter((item) => item.selected)
      .map((item) => item.label)
      .join(",");

    // Create a URLSearchParams instance with current search params
    const params = new URLSearchParams(window.location.search);
    if (selectedCategories) {
      params.set("category", selectedCategories);
    } else {
      params.delete("category");
    }
    if (selectedRegions) {
      params.set("region", selectedRegions);
    } else {
      params.delete("region");
    }

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  }, [categoryItems, regionItems, router]);

  useEffect(() => {
    // Set initial selected items based on URL params
    const categoryParam = searchParams.get("category");
    const regionParam = searchParams.get("region");

    if (categoryParam) {
      const categories = categoryParam.split(",");
      setCategoryItems((items) =>
        items.map((item) => ({
          ...item,
          selected: categories.includes(item.label),
        }))
      );
    }
    if (regionParam) {
      const regions = regionParam.split(",");
      setRegionItems((items) =>
        items.map((item) => ({
          ...item,
          selected: regions.includes(item.label),
        }))
      );
    }
  }, [searchParams]);

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
    setCategoryItems(
      categoryItems.map((item) => ({ ...item, selected: false }))
    );
    setRegionItems(regionItems.map((item) => ({ ...item, selected: false })));
    setOpenDropdown(null);

    // Reset URL without category and region, preserving other params
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    params.delete("region");
    params.delete("meal_type");

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  return (
    <div className="flex items-center justify-center w-full min-w-60 max-w-2xl mx-1 gap-x-4 z-30">
      <div className="flex flex-col md:flex-row gap-3 rounded-3xl">
        <Dropdown
          title="Category"
          items={categoryItems}
          isOpen={openDropdown === 0}
          toggleOpen={() => setOpenDropdown(openDropdown === 0 ? null : 0)}
          onToggle={(index) =>
            handleToggle(index, categoryItems, setCategoryItems)
          }
        />
        <Dropdown
          title="Region"
          items={regionItems}
          isOpen={openDropdown === 1}
          toggleOpen={() => setOpenDropdown(openDropdown === 1 ? null : 1)}
          onToggle={(index) => handleToggle(index, regionItems, setRegionItems)}
        />
      </div>
      <div className="mb-3 relative">
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition z-1"
        >
          <GrPowerReset className="md:hidden" />
          <span className="hidden md:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Filters;
