'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '../../hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar o menu mobile ao navegar
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 0)
      return () => clearTimeout(timer)
    }
  }, [pathname, isOpen])

  const navItems = [
    { name: t('nav.home'), path: '/' },
    {
      name: t('nav.about'),
      path: '/quem-somos',
      submenu: [
        { name: t('nav.brands'), path: '/nossas-marcas' },
        { name: t('nav.partners'), path: '/nossos-parceiros' }
      ]
    },
    { name: t('nav.catalogs'), path: '/catalogos' },
    { name: t('nav.client'), path: '/seja-nosso-cliente' },
    { name: t('nav.careers'), path: '/trabalhe-conosco' }
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <img src="/images/logo.png" alt="LM Rocha Logo" className="logo-image" />
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map((item, idx) => (
            <li key={idx} className={`nav-item ${item.submenu ? 'has-submenu' : ''}`}>
              {item.submenu ? (
                <>
                  <Link href={item.path} className={`nav-link ${isActive(item.path) ? 'active' : ''}`}>
                    {item.name} <span className="chevron">▼</span>
                  </Link>
                  <ul className="submenu-dropdown" style={{ background: '#1a1917', listStyle: 'none' }}>
                    {item.submenu.map((sub, sIdx) => (
                      <li key={sIdx}>
                        <Link
                          href={sub.path}
                          className={`submenu-link ${isActive(sub.path) ? 'active' : ''}`}
                          style={{ color: isActive(sub.path) ? '#ffcc66' : '#e8e4dc' }}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={item.path} className={`nav-link ${isActive(item.path) ? 'active' : ''}`}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side controls */}
        <div className="navbar-controls">
          <LanguageSwitcher />
          <Link href="/contato" className="btn-contact-nav">
            {t('nav.contact')}
          </Link>

          {/* Hamburger button */}
          <button 
            className={`hamburger ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item, idx) => (
            <li key={idx} className="mobile-nav-item">
              <Link href={item.path} className="mobile-nav-link">
                {item.name}
              </Link>
              {item.submenu && (
                <ul className="mobile-submenu">
                  {item.submenu.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <Link href={sub.path} className="mobile-submenu-link">
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="mobile-nav-item" style={{ marginTop: '20px' }}>
            <Link href="/contato" className="btn btn-primary" style={{ width: '100%' }}>
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 1000;
          display: flex;
          align-items: center;
          background: #ffffff;
          border-bottom: 1px solid #e5e0d8;
          transition: all var(--transition-smooth);
        }

        .navbar.scrolled {
          height: 70px;
          background: #ffffff;
          border-bottom: 1px solid #d4cfc7;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-link {
          display: flex;
          align-items: center;
        }

        .logo-image {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: height var(--transition-smooth);
        }

        .navbar.scrolled .logo-image {
          height: 40px;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 28px;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 921px) {
          .nav-links {
            display: none;
          }
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: #3a3530;
          padding: 10px 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.03em;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary-dark);
        }

        .chevron {
          font-size: 0.6rem;
          transition: transform var(--transition-fast);
        }

        .nav-item:hover .chevron {
          transform: rotate(180deg);
        }

        /* Dropdown Submenu */
        .submenu-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          background: #1a1917;
          border: 1px solid rgba(255, 204, 102, 0.35);
          border-radius: 10px;
          padding: 8px 0;
          min-width: 200px;
          list-style: none;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.04);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
        }

        /* small arrow pointer */
        .submenu-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #1a1917;
          border-left: 1px solid rgba(255, 204, 102, 0.35);
          border-top: 1px solid rgba(255, 204, 102, 0.35);
          rotate: 45deg;
        }

        .nav-item:hover .submenu-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .submenu-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e8e4dc !important;
          white-space: nowrap;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          letter-spacing: 0.02em;
        }

        .submenu-link::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 204, 102, 0.5);
          flex-shrink: 0;
          transition: background 0.15s ease;
        }

        .submenu-link:hover,
        .submenu-link.active {
          background: rgba(255, 204, 102, 0.1);
          color: #ffcc66 !important;
        }

        .submenu-link:hover::before,
        .submenu-link.active::before {
          background: #ffcc66;
        }

        /* Controls */
        .navbar-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-contact-nav {
          font-family: var(--font-barlow);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0a0000;
          background: var(--primary);
          border-radius: var(--border-radius-full);
          padding: 8px 24px;
          border: 2px solid transparent;
          transition: all var(--transition-fast);
        }

        .btn-contact-nav:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
        }

        @media (max-width: 544px) {
          .btn-contact-nav {
            display: none;
          }
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 26px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1010;
        }

        @media (max-width: 921px) {
          .hamburger {
            display: flex;
          }
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background: #3a3530;
          transition: all var(--transition-fast);
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #0f0f0e;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform var(--transition-smooth);
          z-index: 1005;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav-links {
          list-style: none;
          width: 80%;
          text-align: center;
          padding: 0;
        }

        .mobile-nav-item {
          margin: 20px 0;
        }

        .mobile-nav-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          display: block;
        }

        .mobile-nav-link:hover {
          color: var(--primary);
        }

        .mobile-submenu {
          list-style: none;
          margin-top: 10px;
          padding: 0;
        }

        .mobile-submenu-link {
          font-size: 1.1rem;
          color: #aca399;
          display: block;
          padding: 5px 0;
        }

        .mobile-submenu-link:hover {
          color: var(--primary);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
