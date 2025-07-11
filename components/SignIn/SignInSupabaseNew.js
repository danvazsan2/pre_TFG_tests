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
                                                    Login with Google
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
                                                    Login with Facebook
                                                </a>
                                            </div>
                                            <div className="text-social-area">
                                                <hr />
                                                <span>Or continue with</span>
                                                <hr />
                                            </div>
                                            <form onSubmit={handleSignIn}>
                                                <div className="input-section mail-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-envelope"></i>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        placeholder="Enter email address"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="input-section password-section">
                                                    <div className="icon">
                                                        <i className="fa-sharp fa-regular fa-lock"></i>
                                                    </div>
                                                    <input 
                                                        type="password" 
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
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

                                                <div className="forget-text">
                                                    <a className="btn-read-more" href="#" onClick={(e) => e.preventDefault()}>
                                                        <span>Forgot password?</span>
                                                    </a>
                                                </div>
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
                                                            Signing In...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa-sharp fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '8px' }}></i>
                                                            Sign In
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                        <div className="signup-box-footer">
                                            <div className="bottom-text">
                                                Don't have an account?{" "}
                                                <Link className="btn-read-more ml--5" href="/signup">
                                                    <span>Sign Up</span>
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
                                                    "AiWave has revolutionized how we work with AI! The seamless authentication 
                                                    and powerful tools make it incredibly easy to collaborate and create amazing results."
                                                </p>
                                                <div className="bottom-content">
                                                    <div className="meta-info-section">
                                                        <h4 className="title-text mb--0">Sarah Johnson</h4>
                                                        <p className="desc mb--20">AI Specialist</p>
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

export default SigninSupabase;
