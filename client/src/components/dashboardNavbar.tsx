// components/Navbar.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import Image from 'next/image';
import { FiSettings, FiList, FiLogOut } from 'react-icons/fi';

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
    <nav className="bg-background1 p-4 flex justify-between items-center">
      <div className='flex flex-row items-center'>
      <Image src='/favicon.png' alt='' width={50} height={50}/>
      <div className="text-primary font-bold text-3xl p-0 mt-0">DatSilo</div>
      </div>
      <SearchBar/>
      <div className="flex items-center space-x-4">
        <button className='flex items-center space-x-2 p-2 hover:bg-gray-400 rounded-full'><FiSettings color='#40dfaf' size={22}/></button>
        <button className='flex items-center space-x-2 p-2 hover:bg-gray-400 rounded-full'><FiList color='#40dfaf' size={22}/></button>
        {username && <span className="text-primary font-bold p-2">{username}</span>}
        <Image src='/assets/images/defaultUser.jpg' alt='' className='rounded-full p-2' width={40} height={40}/>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          <div className='flex flex-row items-center p-1'>
          <FiLogOut size={20}/>
          <span>Logout</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default DashNavbar;
