
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const links = [
  ['Home', '/'],
  ['The Tower', '/#tower'],
  ['Projects', '/projects'],
  ['Residences', '/#Residences'],
  ['Business', '/#BusinessSpaces'],
  ['Retail Spaces', '/#BusinessSpaces'],
  ['Location', '/#Location'],
  ['Amenities', '/#Amenities'],
  ['Contact', '/#contact'],
  ['About Yohart', '/#about'],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.toggleAttribute('data-menu-open', open);

    return () => {
      document.body.removeAttribute('data-menu-open');
    };
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', close);

    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`framer-header${open ? ' is-open' : ''}`}>

    
      <div className="framer-header__bar">

        <div className="framer-header__left">

          <button
            type="button"
            className="framer-header__menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className="framer-header__hamburger"
              aria-hidden="true"
            >
              <i />
              <i />
            </span>

            <span className="framer-header__menu-label">
              Menu
            </span>
          </button>

       
          <Link
            href="/projects"
            className="framer-header__bar-link"
            onClick={closeMenu}
          >
            <span>Projects</span>
            <span aria-hidden="true">Projects</span>
          </Link>

        </div>

      
        <Link
          href="/"
          className="framer-header__logo"
          aria-label="Home"
          onClick={closeMenu}
        >
          <Image
            src="/media/home/yohalogo-nav.png"
            alt="Yoha Logo"
            width={466}
            height={429}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

      </div>

      {/* Expandable Navigation */}
      <div
        className="framer-header__panel"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Primary navigation">

          {/* Projects - Mobile Only */}
          <Link
            href="/projects"
            onClick={closeMenu}
            className="framer-header__nav-link framer-header__mobile-projects"
            tabIndex={open ? 0 : -1}
          >
            <span>Projects</span>
            <span aria-hidden="true">Projects</span>
          </Link>

          {/* Remaining Navigation Links */}
          {links
            .filter(([label]) => label !== 'Projects')
            .map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="framer-header__nav-link"
                tabIndex={open ? 0 : -1}
              >
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </Link>
            ))}

        </nav>
      </div>

    </header>
  );
}
