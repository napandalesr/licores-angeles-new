import Link from 'next/link';
import React from 'react';

type props = {
  location: navsItem,
}

type navsItem = '/' | '/productos';

const NavBar = ({ location }: props) => {
  return <header className='fixed top-0 left-0 shadow p-8 flex w-screen h-20'>
    <ul className='flex w-full justify-end gap-6'>
      <li className={`${location === '/' ? 'underline' : ''}`}><Link href={'/'}>INICIO</Link></li>
      <li className={`${location === '/productos' ? 'underline' : ''}`}><Link href={'/productos'}>PRODUCTOS</Link></li>
    </ul>
  </header>;
}

export default NavBar;