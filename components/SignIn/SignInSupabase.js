"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import logo from "../../public/images/logo/logo.png";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";
import DarkSwitch from "@/components/Header/dark-switch";
import { useAppContext } from "@/context/Context";

const SigninSupabase = () => {
    const router = useRouter();
    const { signIn } = useAuth();

    // Fallback values in case context is not available
    const contextValue = useAppContext();
    const isLightTheme = contextValue?.isLightTheme ?? true;
    const toggleTheme = contextValue?.toggleTheme ?? (() => { });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await signIn(email, password);

            if (error) {
                setError(error.message);
                return;
            }

            // Redirect on successful login
            router.push('/home');
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
                                            <h4 className="title">Sign In</h4>
                                            <p className="b1 desc">
                                                Welcome back! Please enter your details to sign in.
                                            </p>
                                        </div>
                                        <div className="sign-up-form">
                                            <form onSubmit={handleSignIn}>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="single-input-wrapper">
                                                    <input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                {error && (
                                                    <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                                                        {error}
                                                    </div>
                                                )}

                                                <div className="single-input-wrapper">
                                                    <button
                                                        type="submit"
                                                        className="rts-btn btn-primary"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Signing In...' : 'Sign In'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="sign-up-bottom">
                                            <p>
                                                Don't have an account? <Link href="/signup">Sign up</Link>
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
                                        <h4 className="title">Welcome to AiWave</h4>
                                        <p className="disc">
                                            Sign in to access your account and continue your AI journey.
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

export default SigninSupabase;
