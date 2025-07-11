import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useUserProfile = (userId) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) throw error;

                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const updateProfile = async (updates) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;

            setProfile(data);
            return { data, error: null };
        } catch (err) {
            setError(err.message);
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        error,
        updateProfile,
    };
};
