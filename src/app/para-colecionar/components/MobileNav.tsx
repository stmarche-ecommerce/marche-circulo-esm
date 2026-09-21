'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import styles from '../para-colecionar.module.css'
import { SelosFaqLink } from './Faq'

type NavItem = { href: string; label: string }

export function MobileNav({
  items,
  ctaHref,
  ctaLabel,
  instagramHref,
  facebookHref,
}: {
  items: NavItem[]
  ctaHref: string
  ctaLabel: string
  instagramHref: string
  facebookHref: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = original
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <div className={styles.mobileBar}>
      <span className={styles.mobileBarLabel}></span>
      <button
        type="button"
        className={styles.hamburgerBtn}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        aria-controls="pc-mobile-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Sempre montado: fechar o drawer só alterna a classe CSS, nunca desmonta
          este bloco — se desmontasse, o SelosFaqLink (e seu modal) morreria
          junto no mesmo clique que abre o modal e fecha o menu. */}
      <div
        id="pc-mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileMenuBackdrop} onClick={closeMenu} aria-hidden="true" />

        <nav className={styles.mobileMenuPanel} aria-label="Menu da campanha Para Colecionar">
          {items.map((item) =>
            item.href === '#faq' ? (
              <div key={item.href} onClick={closeMenu}>
                <SelosFaqLink
                  label={item.label}
                  wrapperClassName={styles.mobileFaqTrigger}
                  className={styles.mobileMenuLink}
                />
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileMenuLink}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileMenuCta}
            onClick={closeMenu}
          >
            {ctaLabel}
          </Link>

          <div className={styles.mobileMenuSocial}>
            <Link href={instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram" onClick={closeMenu}>
              <FaInstagram size={20} />
            </Link>
            <Link href={facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook" onClick={closeMenu}>
              <FaFacebookF size={20} />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
