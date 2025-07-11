"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserProfile = () => {
    const { user, signOut, updateProfile } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.user_metadata?.first_name || '',
        lastName: user?.user_metadata?.last_name || '',
    });

    const handleSignOut = async () => {
        await signOut();
        router.push('/signin');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({
                first_name: formData.firstName,
                last_name: formData.lastName,
                full_name: `${formData.firstName} ${formData.lastName}`
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div className="profile-header">
                <h2>User Profile</h2>
                <button
                    className="rts-btn btn-secondary"
                    onClick={handleSignOut}
                    style={{ marginLeft: 'auto' }}
                >
                    Sign Out
                </button>
            </div>

            <div className="profile-info" style={{ marginTop: '20px' }}>
                <div className="info-item">
                    <strong>Email:</strong> {user.email}
                </div>
                <div className="info-item">
                    <strong>Email Verified:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}
                </div>
                <div className="info-item">
                    <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
                </div>
                <div className="info-item">
                    <strong>Last Sign In:</strong> {new Date(user.last_sign_in_at).toLocaleDateString()}
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleUpdateProfile} style={{ marginTop: '20px' }}>
                    <div className="single-input-wrapper">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="single-input-wrapper">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="rts-btn btn-primary">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="rts-btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="profile-display" style={{ marginTop: '20px' }}>
                    <div className="info-item">
                        <strong>Name:</strong> {user.user_metadata?.full_name || 'Not set'}
                    </div>
                    <button
                        className="rts-btn btn-primary"
                        onClick={() => setIsEditing(true)}
                        style={{ marginTop: '10px' }}
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
