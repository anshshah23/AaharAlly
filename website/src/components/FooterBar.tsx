"use client";
import React from "react";
import { FaShoppingCart, FaMapMarkerAlt, FaBell, FaHeart, IconType } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Use this for App Router

interface FooterBarProps {
  cartItems: number;
  notifications: number;
}

interface FooterButtonProps {
  icon: IconType;
  label: string;
  path: string;
  badge?: number;
  iconColor: string;
}

const FooterBar: React.FC<FooterBarProps> = ({ cartItems, notifications }) => {
  const router = useRouter();

  const buttons: FooterButtonProps[] = [
    {
      icon: FaMapMarkerAlt,
      label: "Explore",
      path: "/",
      iconColor: "text-orangeCustom",
    },
    {
      icon: FaShoppingCart,
      label: "Cart",
      path: "/cart",
      badge: cartItems,
      iconColor: "text-orangeCustom",
    },
    {
      icon: FaHeart,
      label: "Favorites",
      path: "/favorites",
      iconColor: "text-orangeCustom",
    },
    {
      icon: FaBell,
      label: "Notifications",
      path: "/notifications",
      badge: notifications,
      iconColor: "text-orangeCustom",
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 min-w-[98vw] bg-orange-50 text-black flex justify-around items-center rounded-full m-2 px-4 mx-2 my-2 sm:my-3 lg:my-4 shadow-md z-50 ">
      {buttons.map((button, index) => (
        <div
          key={index}
          className="relative cursor-pointer p-2 flex items-center rounded-full transition-all"
          onClick={() => handleNavigate(button.path)}
        >
          <button.icon className={`text-xl ${button.iconColor} hover:text-redCustom`} />
          {button.badge && button.badge > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-black rounded-full text-xs px-2">
              {button.badge}
            </span>
          )}
          <span className="text-sm mt-2 text-black hidden md:block md:ml-2">{button.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterBar;
