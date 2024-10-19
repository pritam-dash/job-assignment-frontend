import React, { useContext, useState } from 'react';
import { FiUser, FiPhone, FiMail, FiUsers } from 'react-icons/fi';
import { UserContext } from '../../context/userContext.js';

const SignUp = ({ onSignUpSuccess }) => {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        company: '',
        email: '',
        employeeSize: '',
    });

    const [errors, setErrors] = useState({});
    // eslint-disable-next-line
    const [serverError, setServerError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError('');

        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Valid phone number is required';
        if (!formData.company) newErrors.company = 'Company name is required';
        if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.employeeSize) newErrors.employeeSize = 'Employee size is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('Form Data:', formData);
            try {
                // Send data to the backend
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        phone: formData.phone,
                        companyName: formData.company,
                        email: formData.email,
                        employeeSize: formData.employeeSize,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    onSignUpSuccess();
                    setUser({ name: formData.name, email: formData.email, phone: formData.phone });
                } else {
                    setServerError(result.error || 'An error occurred. Please try again.');
                }
            } catch (error) {
                setServerError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:m-auto  lg:w-3/4 p-1 space-y-8 lg:space-y-0 lg:space-x-16">
            <div className="text-center lg:text-left lg:w-1/2 flex items-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                </p>
            </div>

            <div className="bg-white p-8 shadow-lg rounded-lg w-full lg:w-1/2 flex items-center">
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
                    <p className="text-gray-600 mb-3 text-center">Lorem Ipsum is simply dummy text</p>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <FiUser className="text-gray-500 ml-3" /> {/* Icon */}
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="flex-1 block w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <FiPhone className="text-gray-500 ml-3" /> {/* Icon */}
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone no."
                                    className="flex-1 block w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Company */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <FiUser className="text-gray-500 ml-3" /> {/* Icon */}
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="flex-1 block w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <FiMail className="text-gray-500 ml-3" /> {/* Icon */}
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Company Email"
                                    className="flex-1 block w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Employee Size */}
                        <div className="mb-4">
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <FiUsers className="text-gray-500 ml-3" /> {/* Icon */}
                                <input
                                    type="text"
                                    id="employeeSize"
                                    name="employeeSize"
                                    value={formData.employeeSize}
                                    onChange={handleChange}
                                    placeholder="Employee Size"
                                    className="flex-1 block w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {errors.employeeSize && <p className="text-red-500 text-xs mt-1">{errors.employeeSize}</p>}
                        </div>


                        <div className="flex items-center mb-6 text-center justify-center">
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 text-center">
                                By clicking on proceed you will accept our <br /> <a href="#terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
