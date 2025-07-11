"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import logo from "../../public/images/logo/logo.png";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import userImg from "../../public/images/team/team-02sm.jpg";
import brandImg from "../../public/images/brand/brand-t.png";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";
import DarkSwitch from "@/components/Header/dark-switch";
import { useAppContext } from "@/context/Context";

const SignupSupabaseNew = () => {
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

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
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

            setMessage('Account created successfully! Check your email for confirmation.');
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
                            <div className="col-lg-6 bg-color-blackest left-wrapper">
                                <div className="sign-up-box">
                                    <div className="signup-box-top">
                                        <Link href="/">
                                            <Image
                                                src={isLightTheme ? logo : logoDark}
                                                width={193}
                                                height={50}
                                                alt="sign-up logo"
                                            />
                                        </Link>
                                    </div>
                                    <div className="signup-box-bottom">
                                        <div className="signup-box-content">
                                            <div className="social-btn-grp">
                                                <a className="btn-default btn-border" href="#" onClick={(e) => e.preventDefault()}>
                                                    <span className="icon-left">
                                                        <Image
                                                            src={google}
                                                            width={18}
                                                            height={18}
                                                            alt="Google Icon"
                                                        />
                                                    </span>
                                                    Sign up with Google
                                                </a>
                                                <a className="btn-default btn-border" href="#" onClick={(e) => e.preventDefault()}>
                                                    <span className="icon-left">
                                                        <Image
                                                            src={facebook}
                                                            width={18}
                                                            height={18}
                                                            alt="Facebook Icon"
                                                        />
                                                    </span>
                                                    Sign up with Facebook
                                                </a>
                                            </div>
                                            <div className="text-social-area">
                                                <hr />
                                                <span>Or continue with</span>
                                                <hr />
                                            </div>
                                            <form onSubmit={handleSignUp}>
                                                <div className="input-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-user"></i>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="input-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-user"></i>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="input-section mail-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-envelope"></i>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter email address"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="input-section password-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-lock"></i>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password (min 6 characters)"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="input-section password-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-lock"></i>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Confirm Password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                {error && (
                                                    <div className="error-message" style={{
                                                        color: '#ff4757',
                                                        backgroundColor: '#ffebee',
                                                        padding: '12px 16px',
                                                        borderRadius: '8px',
                                                        marginBottom: '15px',
                                                        fontSize: '14px',
                                                        border: '1px solid #ffcdd2',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        animation: 'fadeIn 0.3s ease-in-out'
                                                    }}>
                                                        <i className="fa-sharp fa-solid fa-triangle-exclamation" style={{ marginRight: '8px' }}></i>
                                                        {error}
                                                    </div>
                                                )}

                                                {message && (
                                                    <div className="success-message" style={{
                                                        color: '#2ed573',
                                                        backgroundColor: '#e8f5e8',
                                                        padding: '12px 16px',
                                                        borderRadius: '8px',
                                                        marginBottom: '15px',
                                                        fontSize: '14px',
                                                        border: '1px solid #c8e6c9',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        animation: 'fadeIn 0.3s ease-in-out'
                                                    }}>
                                                        <i className="fa-sharp fa-solid fa-circle-check" style={{ marginRight: '8px' }}></i>
                                                        {message}
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    className="btn-default"
                                                    disabled={loading}
                                                    style={{
                                                        opacity: loading ? 0.7 : 1,
                                                        cursor: loading ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <i className="fa-sharp fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                                            Creating Account...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa-sharp fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i>
                                                            Sign Up
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                        <div className="signup-box-footer">
                                            <div className="bottom-text">
                                                Already have an account?{" "}
                                                <Link className="btn-read-more ml--5" href="/signin">
                                                    <span>Sign In</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 right-wrapper">
                                <div className="client-feedback-area">
                                    <div className="single-feedback">
                                        <div className="inner">
                                            <div className="meta-img-section">
                                                <a className="image" href="#" onClick={(e) => e.preventDefault()}>
                                                    <Image
                                                        src={userImg}
                                                        width={93}
                                                        height={93}
                                                        alt="User Image"
                                                    />
                                                </a>
                                            </div>
                                            <div className="rating">
                                                <a href="#rating" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-sharp fa-solid fa-star"></i>
                                                </a>
                                                <a href="#rating" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-sharp fa-solid fa-star"></i>
                                                </a>
                                                <a href="#rating" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-sharp fa-solid fa-star"></i>
                                                </a>
                                                <a href="#rating" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-sharp fa-solid fa-star"></i>
                                                </a>
                                                <a href="#rating" onClick={(e) => e.preventDefault()}>
                                                    <i className="fa-sharp fa-solid fa-star"></i>
                                                </a>
                                            </div>
                                            <div className="content">
                                                <p className="description">
                                                    "Join thousands of users who have already discovered the power of AiWave. 
                                                    Create your account today and start your AI journey with confidence!"
                                                </p>
                                                <div className="bottom-content">
                                                    <div className="meta-info-section">
                                                        <h4 className="title-text mb--0">Michael Chen</h4>
                                                        <p className="desc mb--20">Product Manager</p>
                                                        <div className="desc-img">
                                                            <Image
                                                                src={brandImg}
                                                                width={83}
                                                                height={23}
                                                                alt="Brand Image"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link className="close-button" href="/">
                        <i className="fa-sharp fa-regular fa-x"></i>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default SignupSupabaseNew;
