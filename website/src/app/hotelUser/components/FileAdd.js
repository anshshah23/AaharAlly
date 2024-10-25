"use client";
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const ServiceProviderUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/serviceProviderUpload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setMessage(`Error uploading file: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-6 bg-gray-50 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Data</h1>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Add Your Products</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            className="mb-4 w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className={`flex items-center justify-center py-2 px-4 w-full text-white font-semibold rounded-md transition-colors duration-200 ${
                                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}

                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Add Users Data</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            className="mb-4 w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className={`flex items-center justify-center py-2 px-4 w-full text-white font-semibold rounded-md transition-colors duration-200 ${
                                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}

                    </form>
                </div>
            </div>

        </div>
    );
};

export default ServiceProviderUpload;
