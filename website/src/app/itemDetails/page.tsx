"use client";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const TacoCard = () => {
  const [quantity, setQuantity] = useState(2);
  const [addOn, setAddOn] = useState('Pepper Julienne');

  const handleAddOnChange = (e) => {
    setAddOn(e.target.value);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addOnChoices = [
    { name: 'None', price:'' },
    { name: 'Pepper Julienne', price: 2.3 },
    { name: 'Baby Spinach', price: 4.7 },
    { name: 'Mushroom', price: 2.5 },
  ];

  return (
    <div className="w-full max-w-full min-h-full my-auto mx-auto bg-white rounded-xl p-5 lg:p-8 transition-all duration-300 flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="relative w-full lg:w-1/3 h-full lg:h-auto mb-5 lg:mb-0 lg:mr-8">
        <Image
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="Ground Beef Tacos"
          width={400}
          height={400}
          className="rounded-xl w-full h-full object-cover shadow-lg shadow-gray-600"
        />
        <button className="absolute top-2 right-2 text-2xl text-red-500 focus:outline-none">
          ❤️
        </button>
      </div>

      {/* Description Section */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            Ground Beef Tacos
          </h2>
          <div className="flex justify-start items-center text-gray-600 mt-2">
            <span className="text-sm md:text-base">⭐ 4.5 (30+)</span>
          </div>
          <div className="flex flex-col md:flex-row justify-start items-center mt-2">
            <div className="flex justify-start items-center">
              <p className="text-2xl md:text-3xl text-orange-500 font-bold">
                $9.50
              </p>
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center mt-4 mx-auto ">
              <button
                onClick={decrementQuantity}
                className="bg-orange-500 text-white w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full text-lg focus:outline-none"
              >
                -
              </button>
              <span className="mx-4 text-lg md:text-xl lg:text-2xl">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-orange-500 text-white w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full text-lg focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mt-3 text-sm md:text-lg">
          Brown the beef better. Lean ground beef – I like to use 85% lean angus.
          Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.
        </p>

        {/* Add-on Choices */}
        <div className="mt-4">
          <p className="font-semibold text-sm md:text-lg">Choice of Add On</p>
          <div className="my-4">
            {
              addOnChoices.map((choice) => (
                <label key={choice.name} className="flex items-center gap-2 mt-2">
                  <input
                    type="radio"
                    value={choice.name}
                    checked={addOn === choice.name}
                    onChange={handleAddOnChange}
                    className="w-3 h-3 appearance-none bg-white border-2 border-orange-500 rounded-md checked:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300"
                  />
                  <span className="text-sm md:text-base">{choice.name}</span>
                  <span className="text-sm md:text-base text-orangeCustom">
                    {choice.price ? `+ $${choice.price}` : ''}
                  </span>
                </label>
              ))
            }
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-2 lg:mt-4 mb-8 flex justify-start">
          <button className="bg-orange-500 text-white py-2 px-5 rounded-lg text-lg font-semibold">
            <Link href="/cart">
              <span>Add to Cart</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TacoCard;
