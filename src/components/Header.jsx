import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BRAND_NAME } from '../utils/constants';
import { useFavourites } from '../hooks/useFavourites';
import { HomeBrandIcon, ArrowUpRightIcon, MenuIcon } from './Icons';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { count } = useFavourites();

  function handleScrollToContact() {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
      isActive
        ? 'text-[#141414] font-semibold'
        : 'text-[#737373] hover:text-[#141414]'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-[#141414] whitespace-nowrap shrink-0"
          >
            <HomeBrandIcon className="h-5 w-5 shrink-0" />
            <span className="text-base font-extrabold tracking-tight sm:text-lg">
              {BRAND_NAME}
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8"
          >
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/properties" className={navLinkClass}>
              Properties
            </NavLink>
            <NavLink to="/favourites" className={navLinkClass}>
              <span>Favourites</span>
              {count > 0 ? (
                <span
                  aria-label={`${count} saved properties`}
                  className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#141414] px-1.5 py-0.5 text-[11px] font-bold leading-none text-white tabular-nums"
                >
                  {count}
                </span>
              ) : null}
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center shrink-0">
            <button
              type="button"
              onClick={handleScrollToContact}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#141414] transition-colors hover:bg-black/5 md:hidden cursor-pointer"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onContactClick={handleScrollToContact}
        returnFocusRef={menuButtonRef}
        favouritesCount={count}
      />
    </>
  );
}
