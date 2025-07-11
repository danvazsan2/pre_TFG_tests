// Test script to verify Supabase connection
import { supabase } from './lib/supabase.js';

async function testSupabaseConnection() {
    console.log('Testing Supabase connection...');

    try {
        // Test 1: Check if we can connect to Supabase
        const { data, error } = await supabase.from('profiles').select('count');

        if (error) {
            console.error('❌ Connection failed:', error.message);
            return false;
        }

        console.log('✅ Supabase connection successful!');

        // Test 2: Check auth functionality
        const { data: authData, error: authError } = await supabase.auth.getSession();

        if (authError) {
            console.error('❌ Auth check failed:', authError.message);
            return false;
        }

        console.log('✅ Auth functionality working!');
        console.log('📊 Current session:', authData.session ? 'Active' : 'No active session');

        return true;
    } catch (err) {
        console.error('❌ Unexpected error:', err);
        return false;
    }
}

// Export for use in other parts of the application
export { testSupabaseConnection };

// If running directly
if (typeof window !== 'undefined') {
    // Browser environment
    testSupabaseConnection();
} else {
    // Node.js environment
    console.log('This test should be run in a browser environment');
}
