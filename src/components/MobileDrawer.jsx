import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BRAND_NAME } from '../utils/constants';
import { HomeBrandIcon, CloseIcon, ArrowUpRightIcon } from './Icons';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({
  isOpen,
  onClose,
  onContactClick,
  returnFocusRef,
  favouritesCount = 0,
}) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { pathname } = useLocation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname && isOpen) {
      onClose();
    }
    previousPathnameRef.current = pathname;
  }, [pathname, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
        if (focusables.length === 0) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (returnFocusRef && returnFocusRef.current) {
        returnFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose, returnFocusRef]);

  if (!isOpen) {
    return null;
  }

  function handleContactAction() {
    onClose();
    window.setTimeout(() => {
      onContactClick();
    }, 60);
  }

  const linkClass = ({ isActive }) =>
    `flex min-h-[48px] items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
      isActive
        ? 'bg-[#f5f5f5] text-[#141414]'
        : 'text-[#525252] hover:bg-[#f5f5f5] hover:text-[#141414]'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] md:hidden"
      onClick={onClose}
    >
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[100dvh] w-full max-w-xs flex-col overflow-y-auto bg-white shadow-2xl"
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <Link
            to="/"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#141414]"
          >
            <HomeBrandIcon className="h-5 w-5" />
            <span className="text-base font-extrabold tracking-tight">
              {BRAND_NAME}
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#141414] transition-colors hover:bg-black/5 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile links" className="flex flex-1 flex-col gap-1.5 p-4">
          <NavLink to="/" end onClick={onClose} className={linkClass}>
            <span>Home</span>
          </NavLink>
          <NavLink to="/properties" onClick={onClose} className={linkClass}>
            <span>Properties</span>
          </NavLink>
          <NavLink to="/favourites" onClick={onClose} className={linkClass}>
            <span>Favourites</span>
            {favouritesCount > 0 ? (
              <span className="inline-flex min-w-[24px] items-center justify-center rounded-full bg-[#141414] px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                {favouritesCount}
              </span>
            ) : null}
          </NavLink>
        </nav>

        <div className="border-t border-black/10 p-4">
          <button
            type="button"
            onClick={handleContactAction}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black/85 cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
