import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MdEmail, MdPhone } from 'react-icons/md';
import { UserContext } from '../../context/userContext.js';

const SignIn = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');

    const [emailOtpValid, setEmailOtpValid] = useState(null);
    const [mobileOtpValid, setMobileOtpValid] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const validateEmailOtp = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, inputOtp: emailOtp }),
            });

            if (response.ok) {
                setEmailOtpValid(true);
                setErrorMessage('');
            } else {
                setEmailOtpValid(false);
                const data = await response.json();
                setErrorMessage(data.error || 'Invalid Email OTP');
            }
        } catch (error) {
            console.error('Error verifying email OTP:', error);
            setErrorMessage('An error occurred while verifying email OTP.');
        }
    };

    const validateMobileOtp = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify/phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: user.phone, inputOtp: mobileOtp }),
            });

            if (response.ok) {
                setMobileOtpValid(true);
                setErrorMessage('');
            } else {
                setMobileOtpValid(false);
                const data = await response.json();
                setErrorMessage(data.error || 'Invalid Mobile OTP');
            }
        } catch (error) {
            console.error('Error verifying mobile OTP:', error);
            setErrorMessage('An error occurred while verifying mobile OTP.');
        }
    };

    const triggerLogin = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
                //credentials: 'include',
            });

            if (response.ok) {
                console.log('Login successful');

                const accessToken = response.headers.get('Authorization').split(' ')[1];
                // const refreshToken = document.cookie.split('=')[1];
                const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];

                setUser((prevState) => ({
                    ...prevState,
                    accessToken,
                    refreshToken
                }));
                
                navigate('/dashboard');
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred while logging in.');
        }
    }, [user.email, setUser, navigate]);

    useEffect(() => {
        if (emailOtpValid && mobileOtpValid) {
            triggerLogin();
        }
    }, [emailOtpValid, mobileOtpValid, triggerLogin]);

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center m-auto w-full lg:w-3/4 p-1 space-y-8 lg:space-y-0 lg:space-x-16">
            <div className="text-center lg:text-left lg:w-1/2 flex items-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>

            <div className="md:w-1/3 w-full bg-white p-8 justify-center items-center rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                <p className="text-gray-500 text-center mb-6">Please enter the OTP sent to your email and phone to sign in</p>

                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                <form className="space-y-4">
                    <div className="relative">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                                <MdEmail size={20} />
                            </span>
                            <input
                                type="text"
                                id="email-otp"
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value)}
                                placeholder="Email OTP"
                                className={`pl-10 w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    emailOtpValid === false ? 'border-red-500' : ''
                                }`}
                                disabled={emailOtpValid === true}
                            />
                            {emailOtpValid === true && (
                                <span className="absolute inset-y-0 right-3 flex items-center text-green-500">
                                    &#10004;
                                </span>
                            )}
                        </div>
                        {emailOtpValid !== true && (
                            <button
                                type="button"
                                onClick={validateEmailOtp}
                                className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Verify Email OTP
                            </button>
                        )}

                        {emailOtpValid === false && <p className="text-red-500 mt-2">Invalid Email OTP</p>}
                    </div>

                    <div className="relative">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                                <MdPhone size={20} />
                            </span>
                            <input
                                type="text"
                                id="mobile-otp"
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value)}
                                placeholder="Mobile OTP"
                                className={`pl-10 w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    mobileOtpValid === false ? 'border-red-500' : ''
                                }`}
                                disabled={mobileOtpValid === true}
                            />
                            {mobileOtpValid === true && (
                                <span className="absolute inset-y-0 right-3 flex items-center text-green-500">
                                    &#10004;
                                </span>
                            )}
                        </div>
                        {mobileOtpValid !== true && (
                            <button
                                type="button"
                                onClick={validateMobileOtp}
                                className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Verify Mobile OTP
                            </button>
                        )}

                        {mobileOtpValid === false && <p className="text-red-500 mt-2">Invalid Mobile OTP</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
