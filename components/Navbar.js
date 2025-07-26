'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Vacation Plan Creator 🏝️</Link>
      </div>
      <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`}>
        <li>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/plans" className={`${styles.navLink} ${pathname === '/plans' ? styles.active : ''}`}>
            Plans
          </Link>
        </li>
        {session && (
          <li>
            <Link href="/create" className={`${styles.navLink} ${pathname === '/create' ? styles.active : ''}`}>
              Create Plan
            </Link>
          </li>
        )}
        <li>
          {session ? (
            <button
              className={styles.navButton}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className={`${styles.navButton} ${pathname === '/login' ? styles.active : ''}`}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}