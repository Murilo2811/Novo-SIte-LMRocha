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
                  <ul className="submenu-dropdown">
                    {item.submenu.map((sub, sIdx) => (
                      <li key={sIdx}>
                        <Link href={sub.path} className={`submenu-link ${isActive(sub.path) ? 'active' : ''}`}>
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
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: all var(--transition-smooth);
        }

        .navbar.scrolled {
          height: 70px;
          background: rgba(18, 18, 17, 0.9);
          border-bottom: 1px solid rgba(255, 204, 102, 0.15);
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
          color: #ffffff;
          padding: 10px 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.03em;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
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
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(18, 18, 17, 0.95);
          border: 1px solid rgba(255, 204, 102, 0.2);
          border-radius: var(--border-radius-sm);
          padding: 12px 0;
          min-width: 180px;
          list-style: none;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-fast);
        }

        .nav-item:hover .submenu-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .submenu-link {
          display: block;
          padding: 8px 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ffffff;
          white-space: nowrap;
        }

        .submenu-link:hover, .submenu-link.active {
          background: rgba(255, 204, 102, 0.1);
          color: var(--primary);
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
          background: #ffffff;
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
