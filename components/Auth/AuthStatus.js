"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AuthStatus = () => {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/signin');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <div className="auth-actions">
                <Link href="/signin" className="rts-btn btn-primary">
                    Sign In
                </Link>
                <Link href="/signup" className="rts-btn btn-secondary" style={{ marginLeft: '10px' }}>
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="user-menu">
            <div className="user-info">
                <span>Welcome, {user.user_metadata?.full_name || user.email}</span>
            </div>
            <div className="user-actions">
                <Link href="/profile-details" className="rts-btn btn-secondary">
                    Profile
                </Link>
                <button
                    onClick={handleSignOut}
                    className="rts-btn btn-primary"
                    style={{ marginLeft: '10px' }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default AuthStatus;
