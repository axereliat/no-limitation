import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@/contexts/AuthContext';
import {supabase} from '@/lib/supabase';

interface MartialArtLink {
    label: string;
    path: string;
}

export default function Header() {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const {user, profile, isAdmin, signOut} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMartialArtsOpen, setIsMartialArtsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const languages = [
        {code: 'bg', label: 'BG'},
        {code: 'en', label: 'EN'},
        {code: 'ru', label: 'RU'},
        {code: 'it', label: 'IT'},
    ];

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsLangOpen(false);
    };

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        {path: '/', label: t('nav.home')},
        {path: '/about', label: t('nav.about')},
        {path: '/contact', label: t('nav.contact')},
    ];

    const [martialArtsLinks, setMartialArtsLinks] = useState<Array<MartialArtLink>>([]);

    useEffect(() => {
        const fetchMartialArts = async () => {
            const {data, error} = await supabase
                .from('martial_arts')
                .select('*')
                .order('title');

            if (error) {
                console.error('Error fetching martial arts:', error);
                return;
            }

            if (data && data.length > 0) {
                const links = data.map(item => ({
                    path: `/martial-arts/${item.id}`,
                    label: item.title
                }));
                setMartialArtsLinks(links);
            }
        };

        fetchMartialArts();
        window.addEventListener('refreshData', fetchMartialArts);

        return () => window.removeEventListener('refreshData', fetchMartialArts);
    }, []);

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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>

                            {isMartialArtsOpen && (
                                <div
                                    className="absolute top-full left-0 mt-2 w-48 bg-secondary rounded-lg shadow-xl py-2">
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>

                            {isLangOpen && (
                                <div
                                    className="absolute top-full right-0 mt-2 w-20 bg-secondary rounded-lg shadow-xl py-2">
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

                        {/* Auth UI */}
                        {user ? (
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 text-white hover:text-accent transition-colors"
                                >
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt=""
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent text-sm font-medium">
                        {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </span>
                                        </div>
                                    )}
                                    <svg
                                        className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>

                                {isUserMenuOpen && (
                                    <div
                                        className="absolute top-full right-0 mt-2 w-48 bg-secondary rounded-lg shadow-xl py-2">
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="block px-4 py-2 text-sm text-white hover:bg-primary hover:text-accent transition-colors"
                                        >
                                            {t('auth.profile')}
                                        </Link>
                                        {isAdmin && (
                                            <>
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="block px-4 py-2 text-sm text-white hover:bg-primary hover:text-accent transition-colors"
                                                >
                                                    {t('admin.dashboard')}
                                                </Link>
                                                <Link
                                                    to="/admin/users"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="block px-4 py-2 text-sm text-white hover:bg-primary hover:text-accent transition-colors"
                                                >
                                                    {t('admin.manageUsers')}
                                                </Link>
                                            </>
                                        )}
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-primary hover:text-accent transition-colors"
                                        >
                                            {t('auth.logout')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="ml-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-1.5 border border-white/30 text-white text-sm font-medium rounded-md hover:border-accent hover:text-accent transition-colors"
                                >
                                    {t('auth.login')}
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
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

                        {/* Mobile Auth */}
                        <div className="mt-4 pt-4 border-t border-gray-700">
                            {user ? (
                                <div className="space-y-2">
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 text-sm text-white hover:text-accent"
                                    >
                                        {t('auth.profile')}
                                    </Link>
                                    {isAdmin && (
                                        <>
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block py-2 text-sm text-white hover:text-accent"
                                            >
                                                {t('admin.dashboard')}
                                            </Link>
                                            <Link
                                                to="/admin/users"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block py-2 text-sm text-white hover:text-accent"
                                            >
                                                {t('admin.manageUsers')}
                                            </Link>
                                        </>
                                    )}
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block py-2 text-sm text-white hover:text-accent"
                                    >
                                        {t('auth.logout')}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-4 py-1.5 border border-white/30 text-white text-sm font-medium rounded-md hover:border-accent hover:text-accent transition-colors"
                                    >
                                        {t('auth.login')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
