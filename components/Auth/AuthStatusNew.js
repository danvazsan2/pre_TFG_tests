"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AuthStatusNew = () => {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  if (loading) {
    return (
      <div className="auth-loading">
        <i className="fa-sharp fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link href="/signin" className="btn-default btn-border" style={{ 
          padding: '8px 16px', 
          fontSize: '14px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fa-sharp fa-solid fa-sign-in-alt" style={{ marginRight: '5px' }}></i>
          Sign In
        </Link>
        <Link href="/signup" className="btn-default" style={{ 
          padding: '8px 16px', 
          fontSize: '14px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fa-sharp fa-solid fa-user-plus" style={{ marginRight: '5px' }}></i>
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="user-avatar" style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {user.user_metadata?.first_name ? 
            user.user_metadata.first_name.charAt(0).toUpperCase() : 
            user.email.charAt(0).toUpperCase()
          }
        </div>
        <div className="user-details">
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            {user.user_metadata?.full_name || user.email}
          </span>
          {user.user_metadata?.full_name && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.email}
            </div>
          )}
        </div>
      </div>
      <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
        <Link href="/profile-details" className="btn-default btn-border" style={{ 
          padding: '6px 12px', 
          fontSize: '12px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fa-sharp fa-solid fa-user" style={{ marginRight: '4px' }}></i>
          Profile
        </Link>
        <button 
          onClick={handleSignOut}
          className="btn-default btn-border"
          style={{ 
            padding: '6px 12px', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            background: 'transparent',
            color: 'inherit'
          }}
        >
          <i className="fa-sharp fa-solid fa-sign-out-alt" style={{ marginRight: '4px' }}></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AuthStatusNew;
