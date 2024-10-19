import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext.js';

const CreatePostForm = ({ onFormSubmit }) => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        experienceLevel: '',
        candidateEmails: [],
        endDate: ''
    });

    const [currentEmail, setCurrentEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (validateEmail(currentEmail)) {
            if (!formData.candidateEmails.includes(currentEmail)) {
                setFormData((prevData) => ({
                    ...prevData,
                    candidateEmails: [...prevData.candidateEmails, currentEmail]
                }));
                setCurrentEmail('');
                setEmailError('');
            } else {
                setEmailError('This email is already added.');
            }
        } else {
            setEmailError('Invalid email format. Please enter a valid email.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        onFormSubmit();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/postAndNotify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
              },
              body: JSON.stringify({
                title: formData.jobTitle,
                description: formData.jobDescription,
                experienceLevel: formData.experienceLevel,
                endDate: formData.endDate,
                emails: formData.candidateEmails,
                }),
            });
            if (response.ok) {
              const data = await response.json();
              console.log('Job posted successfully: ', data);
              onFormSubmit();
            } else {
              console.error('Job posting failed');
            }
          } catch (error) {
            console.error('Error submitting the form', error);
          }

    };

    return (
        <div className="flex flex-col w-full p-4 lg:ml-20 lg:mt-20 bg-white">
            <div className="bg-white p-2 lg:p-8 mt-8 lg:mt-0 w-full lg:w-1/2">
                <form onSubmit={handleSubmit}>
                    {/* Job Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                        <label htmlFor="jobTitle" className="text-lg font-medium text-gray-700">Job Title</label>
                        <div className="sm:col-span-2">
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                placeholder="Enter Job Title"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    {/* Job Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                        <label htmlFor="jobDescription" className="text-lg font-medium text-gray-700">Job Description</label>
                        <div className="sm:col-span-2">
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                rows="6"
                                placeholder="Enter Job Description"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                        <label htmlFor="experienceLevel" className="text-lg font-medium text-gray-700">Experience Level</label>
                        <div className="sm:col-span-2">
                            <select
                                id="experienceLevel"
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option>Select Experience Level</option>
                                <option>Entry</option>
                                <option>Mid</option>
                                <option>Senior</option>
                            </select>
                        </div>
                    </div>

                    {/* Add Candidate */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                        <label htmlFor="candidateEmail" className="text-lg font-medium text-gray-700">Add Candidate</label>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <input
                                    type="email"
                                    id="candidateEmail"
                                    name="candidateEmail"
                                    placeholder="xyz@gmail.com"
                                    value={currentEmail}
                                    onChange={(e) => setCurrentEmail(e.target.value)}
                                    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${emailError ? 'border-red-500' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddEmail}
                                    className="ml-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                            {/* Display email error */}
                            {emailError && (
                                <p className="text-red-500 text-sm mt-2">{emailError}</p>
                            )}
                            {/* Display added emails */}
                            <ul className="mt-2">
                                {formData.candidateEmails.map((email, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        {email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                        <label htmlFor="endDate" className="text-lg font-medium text-gray-700">End Date</label>
                        <div className="sm:col-span-2">
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-row-reverse">
                        <button
                            type="submit"
                            className="w-full lg:w-1/5 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostForm;
