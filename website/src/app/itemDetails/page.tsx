"use client";
import Image from 'next/image';
import { useState } from 'react';

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

    return (
        <div className="max-w-sm md:max-w-md lg:max-w-full mx-auto flex bg-white rounded-xl shadow-lg p-5 lg:p-8 transition-all duration-300">
            {/* Image Section */}
            <div className="relative">
                <Image
                    src="/tacos.jpg"
                    alt="Ground Beef Tacos"
                    width={400}
                    height={250}
                    className="rounded-xl w-full object-cover"
                />
                <button className="absolute top-2 right-2 text-2xl text-red-500 focus:outline-none">
                    ❤️
                </button>
            </div>
            <div className="mt-5">
                {/* Description Section */}
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                        Ground Beef Tacos
                    </h2>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-sm md:text-base">⭐ 4.5 (30+)</span>
                        <a href="#" className="text-sm md:text-base text-orange-500">
                            See Review
                        </a>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-2xl md:text-3xl text-orange-500 font-bold mt-2">
                            $9.50
                        </p>
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-center mt-4">
                            <button
                                onClick={decrementQuantity}
                                className="bg-orange-500 text-white w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full text-lg focus:outline-none"
                            >
                                -
                            </button>
                            <span className="mx-4 text-lg md:text-xl lg:text-2xl">{quantity}</span>
                            <button
                                onClick={incrementQuantity}
                                className="bg-orange-500 text-white w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full text-lg focus:outline-none"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-gray-700 mt-3 text-sm md:text-base">
                    Brown the beef better. Lean ground beef – I like to use 85% lean angus.
                    Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.
                </p>

                {/* Add-on Choices */}
                <div className="mt-4">
                    <p className="font-semibold text-sm md:text-base">Choice of Add On</p>
                    <div className="mt-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Pepper Julienne"
                                checked={addOn === 'Pepper Julienne'}
                                onChange={handleAddOnChange}
                                className="mr-2"
                            />
                            Pepper Julienne +$2.30
                        </label>
                        <label className="flex items-center mt-2">
                            <input
                                type="radio"
                                value="Baby Spinach"
                                checked={addOn === 'Baby Spinach'}
                                onChange={handleAddOnChange}
                                className="mr-2"
                            />
                            Baby Spinach +$4.70
                        </label>
                        <label className="flex items-center mt-2">
                            <input
                                type="radio"
                                value="Masroom"
                                checked={addOn === 'Masroom'}
                                onChange={handleAddOnChange}
                                className="mr-2"
                            />
                            Masroom +$2.50
                        </label>
                    </div>
                </div>
                {/* Add to Cart Button */}
                <button className="bg-orange-500 text-white w-full py-3 md:py-4 lg:py-5 mt-6 rounded-lg text-lg md:text-xl lg:text-2xl font-semibold">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default TacoCard;
