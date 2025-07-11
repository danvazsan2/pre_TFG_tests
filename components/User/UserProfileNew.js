"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserNav from "../Common/UserNav";

const UserProfileNew = () => {
    const { user, signOut, updateProfile } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        firstName: user?.user_metadata?.first_name || '',
        lastName: user?.user_metadata?.last_name || '',
        email: user?.email || '',
        bio: user?.user_metadata?.bio || 'My name is AiWave user and I\'m exploring the amazing world of AI. I have a passion for technology and creating innovative solutions.',
        website: user?.user_metadata?.website || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await updateProfile({
                first_name: formData.firstName,
                last_name: formData.lastName,
                full_name: `${formData.firstName} ${formData.lastName}`,
                bio: formData.bio,
                website: formData.website
            });
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setError('Error updating profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.push('/signin');
    };

    if (!user) {
        return (
            <div className="rbt-main-content mb--0">
                <div className="rbt-daynamic-page-content center-width">
                    <div className="rbt-dashboard-content">
                        <div className="content-page pb--50">
                            <div className="chat-box-list">
                                <div className="loading-spinner" style={{ textAlign: 'center', padding: '50px' }}>
                                    <i className="fa-sharp fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
                                    <p>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="rbt-main-content mb--0">
                <div className="rbt-daynamic-page-content center-width">
                    <div className="rbt-dashboard-content">
                        <UserNav title="Profile Details" />

                        <div className="content-page pb--50">
                            <div className="chat-box-list">
                                <div className="single-settings-box profile-details-box overflow-hidden">
                                    <div className="profile-details-tab">
                                        <div className="advance-tab-button mb--30">
                                            <ul
                                                className="nav nav-tabs tab-button-style-2 justify-content-start"
                                                id="settingsTab-4"
                                                role="tablist"
                                            >
                                                <li role="presentation">
                                                    <a
                                                        href="#"
                                                        className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab('profile');
                                                        }}
                                                    >
                                                        <span className="title">
                                                            <i className="fa-sharp fa-solid fa-user" style={{ marginRight: '8px' }}></i>
                                                            Profile
                                                        </span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a
                                                        href="#"
                                                        className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab('account');
                                                        }}
                                                    >
                                                        <span className="title">
                                                            <i className="fa-sharp fa-solid fa-gear" style={{ marginRight: '8px' }}></i>
                                                            Account
                                                        </span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a
                                                        href="#"
                                                        className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab('security');
                                                        }}
                                                    >
                                                        <span className="title">
                                                            <i className="fa-sharp fa-solid fa-shield-halved" style={{ marginRight: '8px' }}></i>
                                                            Security
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="tab-content">
                                            {activeTab === 'profile' && (
                                                <div className="tab-pane fade active show">
                                                    {message && (
                                                        <div className="alert alert-success" style={{
                                                            color: '#2ed573',
                                                            backgroundColor: '#e8f5e8',
                                                            padding: '12px 16px',
                                                            borderRadius: '8px',
                                                            marginBottom: '20px',
                                                            border: '1px solid #c8e6c9',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            <i className="fa-sharp fa-solid fa-circle-check" style={{ marginRight: '8px' }}></i>
                                                            {message}
                                                        </div>
                                                    )}

                                                    {error && (
                                                        <div className="alert alert-danger" style={{
                                                            color: '#ff4757',
                                                            backgroundColor: '#ffebee',
                                                            padding: '12px 16px',
                                                            borderRadius: '8px',
                                                            marginBottom: '20px',
                                                            border: '1px solid #ffcdd2',
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            <i className="fa-sharp fa-solid fa-triangle-exclamation" style={{ marginRight: '8px' }}></i>
                                                            {error}
                                                        </div>
                                                    )}

                                                    <form
                                                        onSubmit={handleUpdateProfile}
                                                        className="rbt-profile-row rbt-default-form row row--15"
                                                    >
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="firstName">First Name</label>
                                                                <input
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    type="text"
                                                                    placeholder="First Name"
                                                                    value={formData.firstName}
                                                                    onChange={handleInputChange}
                                                                    readOnly={!isEditing}
                                                                    style={{
                                                                        backgroundColor: !isEditing ? '#f8f9fa' : '#ffffff'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="lastName">Last Name</label>
                                                                <input
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    type="text"
                                                                    placeholder="Last Name"
                                                                    value={formData.lastName}
                                                                    onChange={handleInputChange}
                                                                    readOnly={!isEditing}
                                                                    style={{
                                                                        backgroundColor: !isEditing ? '#f8f9fa' : '#ffffff'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="email">Email</label>
                                                                <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    placeholder="Email"
                                                                    value={formData.email}
                                                                    readOnly={true}
                                                                    style={{
                                                                        backgroundColor: '#f8f9fa',
                                                                        cursor: 'not-allowed'
                                                                    }}
                                                                />
                                                                <small className="form-text text-muted">
                                                                    <i className="fa-sharp fa-solid fa-info-circle" style={{ marginRight: '5px' }}></i>
                                                                    Email cannot be changed
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="website">Website</label>
                                                                <input
                                                                    id="website"
                                                                    name="website"
                                                                    type="url"
                                                                    placeholder="https://yourwebsite.com"
                                                                    value={formData.website}
                                                                    onChange={handleInputChange}
                                                                    readOnly={!isEditing}
                                                                    style={{
                                                                        backgroundColor: !isEditing ? '#f8f9fa' : '#ffffff'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="bio">Bio</label>
                                                                <textarea
                                                                    id="bio"
                                                                    name="bio"
                                                                    rows="5"
                                                                    placeholder="Tell us about yourself..."
                                                                    value={formData.bio}
                                                                    onChange={handleInputChange}
                                                                    readOnly={!isEditing}
                                                                    style={{
                                                                        backgroundColor: !isEditing ? '#f8f9fa' : '#ffffff',
                                                                        resize: 'vertical'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mt--20">
                                                            <div className="form-group mb--0">
                                                                {!isEditing ? (
                                                                    <button
                                                                        type="button"
                                                                        className="btn-default"
                                                                        onClick={() => setIsEditing(true)}
                                                                    >
                                                                        <i className="fa-sharp fa-solid fa-edit" style={{ marginRight: '8px' }}></i>
                                                                        Edit Profile
                                                                    </button>
                                                                ) : (
                                                                    <div className="button-group">
                                                                        <button
                                                                            type="submit"
                                                                            className="btn-default"
                                                                            disabled={loading}
                                                                            style={{
                                                                                marginRight: '10px',
                                                                                opacity: loading ? 0.7 : 1
                                                                            }}
                                                                        >
                                                                            {loading ? (
                                                                                <>
                                                                                    <i className="fa-sharp fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                                                                    Saving...
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <i className="fa-sharp fa-solid fa-save" style={{ marginRight: '8px' }}></i>
                                                                                    Save Changes
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-default btn-border"
                                                                            onClick={() => {
                                                                                setIsEditing(false);
                                                                                setFormData({
                                                                                    firstName: user?.user_metadata?.first_name || '',
                                                                                    lastName: user?.user_metadata?.last_name || '',
                                                                                    email: user?.email || '',
                                                                                    bio: user?.user_metadata?.bio || 'My name is AiWave user and I\'m exploring the amazing world of AI.',
                                                                                    website: user?.user_metadata?.website || '',
                                                                                });
                                                                                setError('');
                                                                                setMessage('');
                                                                            }}
                                                                        >
                                                                            <i className="fa-sharp fa-solid fa-times" style={{ marginRight: '8px' }}></i>
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}

                                            {activeTab === 'account' && (
                                                <div className="tab-pane fade active show">
                                                    <div className="account-info-section">
                                                        <h5 className="title">Account Information</h5>
                                                        <div className="info-list">
                                                            <div className="info-item">
                                                                <strong>
                                                                    <i className="fa-sharp fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>
                                                                    Email:
                                                                </strong> 
                                                                <span>{user.email}</span>
                                                            </div>
                                                            <div className="info-item">
                                                                <strong>
                                                                    <i className="fa-sharp fa-solid fa-shield-check" style={{ marginRight: '8px' }}></i>
                                                                    Email Verified:
                                                                </strong> 
                                                                <span className={user.email_confirmed_at ? 'text-success' : 'text-warning'}>
                                                                    {user.email_confirmed_at ? (
                                                                        <>
                                                                            <i className="fa-sharp fa-solid fa-check-circle" style={{ marginRight: '5px' }}></i>
                                                                            Verified
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <i className="fa-sharp fa-solid fa-exclamation-triangle" style={{ marginRight: '5px' }}></i>
                                                                            Not Verified
                                                                        </>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="info-item">
                                                                <strong>
                                                                    <i className="fa-sharp fa-solid fa-calendar-plus" style={{ marginRight: '8px' }}></i>
                                                                    Account Created:
                                                                </strong> 
                                                                <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="info-item">
                                                                <strong>
                                                                    <i className="fa-sharp fa-solid fa-clock" style={{ marginRight: '8px' }}></i>
                                                                    Last Sign In:
                                                                </strong> 
                                                                <span>{new Date(user.last_sign_in_at).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'security' && (
                                                <div className="tab-pane fade active show">
                                                    <div className="security-section">
                                                        <h5 className="title">Security Settings</h5>
                                                        <div className="security-actions">
                                                            <div className="action-item">
                                                                <div className="action-info">
                                                                    <h6>Sign Out</h6>
                                                                    <p>Sign out from your account on this device</p>
                                                                </div>
                                                                <button
                                                                    className="btn-default btn-border"
                                                                    onClick={handleSignOut}
                                                                >
                                                                    <i className="fa-sharp fa-solid fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                                                                    Sign Out
                                                                </button>
                                                            </div>
                                                            <div className="action-item">
                                                                <div className="action-info">
                                                                    <h6>Password Reset</h6>
                                                                    <p>Reset your password via email</p>
                                                                </div>
                                                                <button
                                                                    className="btn-default btn-border"
                                                                    onClick={() => alert('Password reset functionality will be implemented soon')}
                                                                >
                                                                    <i className="fa-sharp fa-solid fa-key" style={{ marginRight: '8px' }}></i>
                                                                    Reset Password
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileNew;
