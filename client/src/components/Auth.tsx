// components/Auth.tsx
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const router=useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard'); // Redirect to dashboard
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">DatSilo Sign-in</h2>
        <div className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={handleSignIn}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          <div className="text-center text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link href="/signup">
            <span
              
              className="text-primary cursor-pointer hover:underline"
              >
              Sign Up
            </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
