import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Adddata() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        bookID: '',
        bookName: '',
        bookAuthorName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/users', formData)
            .then(() => {
                toast.success('Data added successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    bookID: '',
                    bookName: '',
                    bookAuthorName: '',
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to add data');
            });
    };

    return (
        <>
            <div className='bg-customdark text-white min-h-screen flex flex-col justify-center items-center'>
                <div className="">
                    <form onSubmit={handleSubmit} className="bg-customgray px-24 py-5 rounded-lg shadow-lg">
                        <div className='flex  justify-center items-center'>
                            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
                        </div>

                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Book ID:</label>
                            <input
                                type="text"
                                name="bookID"
                                value={formData.bookID}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Book Name:</label>
                            <input
                                type="text"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <label className="block mb-1 w-1/3 pr-4">Book Author Name:</label>
                            <input
                                type="text"
                                name="bookAuthorName"
                                value={formData.bookAuthorName}
                                onChange={handleInputChange}
                                required
                                className="bg-transparent text-white border-b border-white w-2/3 py-3 focus:outline-none"
                            />
                        </div>
                        <div className='flex  justify-center items-center'>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
