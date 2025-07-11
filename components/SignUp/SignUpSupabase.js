"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import logo from "../../public/images/logo/logo.png";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import DarkSwitch from "@/components/Header/dark-switch";
import { useAppContext } from "@/context/Context";

const SignupSupabase = () => {
    const router = useRouter();
    const { signUp } = useAuth();

    // Fallback values in case context is not available
    const contextValue = useAppContext();
    const isLightTheme = contextValue?.isLightTheme ?? true;
    const toggleTheme = contextValue?.toggleTheme ?? (() => { });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await signUp(
                formData.email,
                formData.password,
                {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    full_name: `${formData.firstName} ${formData.lastName}`
                }
            );

            if (error) {
                setError(error.message);
                return;
            }

            setMessage('Check your email for the confirmation link!');
            // Optionally redirect to sign in page after a delay
            setTimeout(() => {
                router.push('/signin');
            }, 3000);
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DarkSwitch isLight={isLightTheme} switchTheme={toggleTheme} />
            <main className="page-wrapper">
                <div className="signup-area">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="signup-box-left">
                                    <div className="sign-up-left">
                                        <div className="sign-up-header">
                                            <h4 className="title">Sign Up</h4>
                                            <p className="b1 desc">
                                                Create your account to get started with AiWave.
                                            </p>
                                        </div>
                                        <div className="sign-up-form">
                                            <form onSubmit={handleSignUp}>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="Enter your first name"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Enter your last name"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter your password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Confirm your password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                {error && (
                                                    <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                                                        {error}
                                                    </div>
                                                )}

                                                {message && (
                                                    <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
                                                        {message}
                                                    </div>
                                                )}

                                                <div className="single-input-wrapper">
                                                    <button
                                                        type="submit"
                                                        className="rts-btn btn-primary"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="sign-up-bottom">
                                            <p>
                                                Already have an account? <Link href="/signin">Sign in</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="signup-box-right">
                                    <div className="thumbnail">
                                        <Image
                                            src={isLightTheme ? logo : logoDark}
                                            alt="logo"
                                            width={200}
                                            height={50}
                                        />
                                    </div>
                                    <div className="content">
                                        <h4 className="title">Join AiWave</h4>
                                        <p className="disc">
                                            Start your AI journey with us today. Create your account and explore powerful AI tools.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignupSupabase;
