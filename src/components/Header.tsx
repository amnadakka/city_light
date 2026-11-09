import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { assetUrl } from '../services/productService'
import styles from './Header.module.css'

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/collections/perfumes', label: 'العطور' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل' },
]

interface HeaderProps {
  onSearchOpen: () => void
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { itemCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className={styles.announcement}>شحن دولي سريع · عبوات مختارة بعناية</div>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <nav className={styles.nav} aria-label="القائمة الرئيسية">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
            <img
              className={styles.brandLogo}
              src={assetUrl('logo.png')}
              alt="City Lights Fragrances"
              width={56}
              height={56}
            />
            <span className={styles.brandText}>
              <span className={styles.brandEn}>City Lights</span>
              <span className={styles.brandAr}>سيتي لايت</span>
            </span>
          </Link>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="بحث"
              onClick={onSearchOpen}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="السلة"
              onClick={openCart}
            >
              <CartIcon />
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className={`container ${styles.mobileNav}`} aria-label="قائمة الجوال">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h12l-1 12H7L6 7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 7a3 3 0 016 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
