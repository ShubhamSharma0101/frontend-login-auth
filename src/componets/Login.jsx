import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

   

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (username !== 'emilys') {
            toast.error('Invalid username. Only "emilys" is allowed.');
            setIsSubmitting(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            toast.error('Invalid email format. Please enter a valid email.');
            setIsSubmitting(false);
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 30,
                }),
            });

            if (!response.ok) {
                toast.error('Wrong Credentials');
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            toast.success('Login successful!');
            toast.success('Navigating towards home');

            localStorage.setItem('userDetails', JSON.stringify(data));
            localStorage.setItem('authToken', JSON.stringify(data.accessToken));
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col min-h-screen items-center justify-center bg-gray-100 sm:flex-row">
            <ToastContainer />

            <div className='flex items-center justify-center'>

            <div className="flex items-center justify-center">

                <img className="w-1/2" src="/images/Illustration.png" alt="Illustration" />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 text-left">
                    Welcome to <br />
                    <span className="text-purple-600 font-bold">Unstop</span>
                </h1>

                {/* Social Media */}
                <div className="mt-6">
                    <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 border rounded-md">
                        <img src="/images/Frame 1116607310.png" alt="Google" className="w-5 h-5 mr-2" />
                        Login with Google
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 mt-3 text-sm font-medium text-gray-700 border rounded-md">
                        <img src="/images/Frame 1116607311.png" alt="Facebook" className="w-5 h-5 mr-2" />
                        Login with Facebook
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="border-t w-full"></div>
                    <span className="px-4 text-sm text-gray-500">OR</span>
                    <div className="border-t w-full"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="flex items-center gap-4 bg-gray-200 border rounded-2xl px-2">
                        <img src="/images/account_circle.png" alt="Account Icon" />
                        <div>
                            <label htmlFor="username" className="text-xs font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="text-sm font-bold text-black w-full bg-transparent placeholder:font-bold placeholder:text-black focus:placeholder-transparent focus:outline-none focus:ring-0 border-none -mt-1"
                                placeholder="username"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4 bg-gray-200 border rounded-2xl px-2 mt-4">
                        <img src="/images/mail.png" alt="Mail Icon" />
                        <div>
                            <label htmlFor="email" className="text-xs font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm font-bold text-black w-full bg-transparent placeholder:font-bold placeholder:text-black focus:placeholder-transparent focus:outline-none focus:ring-0 border-none -mt-1"
                                placeholder="username@gmail.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-4 bg-gray-200 border rounded-2xl px-2 mt-4">
                        <img src="/images/key.png" alt="Password Icon" />
                        <div>
                            <label htmlFor="password" className="text-xs font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-sm font-bold text-black w-full bg-transparent placeholder:font-bold placeholder:text-black focus:placeholder-transparent focus:outline-none focus:ring-0 border-none -mt-1"
                                placeholder="********"
                                required
                                minLength="8"
                            />
                        </div>
                        <img
                            onClick={togglePasswordVisibility}
                            className="hover:cursor-pointer"
                            src="/images/visibility.png"
                            alt="Toggle Password Visibility"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-purple-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">
                            I don't have an account?{' '}
                            <a href="#" className="text-sm text-purple-600 hover:underline">
                                Register
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
