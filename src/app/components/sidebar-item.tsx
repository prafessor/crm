import Image from 'next/image';
import React from 'react';

export interface SidebarItemProps {
  pathname: string;
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function SidebarItem({
  pathname,
  src,
  alt,
  children,
}: SidebarItemProps) {
  return (
    <li>
      <a className='flex items-center gap-3.5 h-9 mx-1' href={pathname}>
        <Image className='ml-5' width={18} height={18} src={src} alt={alt} />
        <span className='font-medium text-zinc-50'>{children}</span>
      </a>
    </li>
  );
}
