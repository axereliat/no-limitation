import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMartialArtsOpen, setIsMartialArtsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'bg', label: 'BG' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'it', label: 'IT' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/schedule', label: t('nav.schedule') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const martialArtsLinks = [
    { path: '/martial-arts/jeet-kune-do', label: t('martialArts.jkd.name') },
    { path: '/martial-arts/mma', label: t('martialArts.mma.name') },
    { path: '/martial-arts/bjj', label: t('martialArts.bjj.name') },
    { path: '/martial-arts/san-da', label: t('martialArts.sanda.name') },
    { path: '/martial-arts/eskrima', label: t('martialArts.eskrima.name') },
  ];

  return (
    <header className="bg-secondary sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-accent font-bold text-2xl tracking-wider">NL</span>
            <span className="text-white font-semibold hidden sm:block">{t('header.fightClub')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.path) ? 'text-accent' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Martial Arts Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMartialArtsOpen(!isMartialArtsOpen)}
                className="text-sm font-medium text-white hover:text-accent transition-colors flex items-center gap-1"
              >
                {t('nav.martialArts')}
                <svg
                  className={`w-4 h-4 transition-transform ${isMartialArtsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMartialArtsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-secondary rounded-lg shadow-xl py-2">
                  {martialArtsLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMartialArtsOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-primary hover:text-accent transition-colors ${
                        isActive(link.path) ? 'text-accent' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="px-3 py-1 border border-accent text-accent rounded text-sm font-medium hover:bg-accent hover:text-primary transition-colors flex items-center gap-1"
              >
                {i18n.language.toUpperCase()}
                <svg
                  className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-20 bg-secondary rounded-lg shadow-xl py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-primary hover:text-accent transition-colors ${
                        i18n.language === lang.code ? 'text-accent' : 'text-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.path) ? 'text-accent' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="py-2">
              <span className="text-text-muted text-sm">{t('nav.martialArts')}</span>
              <div className="pl-4 mt-1">
                {martialArtsLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-1 text-sm hover:text-accent transition-colors ${
                      isActive(link.path) ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 border rounded text-sm font-medium transition-colors ${
                    i18n.language === lang.code
                      ? 'border-accent bg-accent text-primary'
                      : 'border-accent text-accent'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
