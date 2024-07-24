// components/Navbar.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

const DashNavbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
      } else {
        const { username } = user.user_metadata as { username: string };
        setUsername(username);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-background p-4 flex justify-between items-center">
      
      <div className="text-primary font-bold text-2xl p-0 mt-0">DatSilo</div>
      <SearchBar/>
      <div className="flex items-center space-x-4">
        {username && <span className="text-primary">Welcome, {username}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashNavbar;
