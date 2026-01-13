import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const disciplines = [
    { key: 'jkd', path: '/martial-arts/jeet-kune-do', icon: '🥋' },
    { key: 'mma', path: '/martial-arts/mma', icon: '🥊' },
    { key: 'bjj', path: '/martial-arts/bjj', icon: '🤼' },
    { key: 'sanda', path: '/martial-arts/san-da', icon: '👊' },
    { key: 'eskrima', path: '/martial-arts/eskrima', icon: '🗡️' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <picture className="absolute inset-0">
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero-bg-768.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/images/hero-bg-1024.webp"
            type="image/webp"
          />
          <source srcSet="/images/hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-[80%_top] md:object-top"
            loading="eager"
          />
        </picture>

        {/* Overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent md:from-background/80 md:via-background/50"></div>

        {/* Content - aligned left */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 tracking-widest drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-foreground mb-6 font-light">
            {t('hero.subtitle')}
          </p>
          <blockquote className="text-muted-foreground text-base md:text-lg italic mb-2">
            {t('hero.quote')}
          </blockquote>
          <p className="text-primary mb-8">{t('hero.quoteAuthor')}</p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.welcome')}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            {t('home.intro')}
          </p>
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('home.disciplines')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((discipline) => (
              <Link
                key={discipline.key}
                to={discipline.path}
                className="group bg-primary p-8 rounded-xl hover:bg-accent/10 border border-transparent hover:border-accent transition-all"
              >
                <div className="text-5xl mb-4">{discipline.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-3">
                  {t(`martialArts.${discipline.key}.name`)}
                </h3>
                <p className="text-text-muted text-sm line-clamp-3">
                  {t(`martialArts.${discipline.key}.description`)}
                </p>
                <span className="inline-block mt-4 text-accent text-sm font-medium">
                  {t('martialArts.learnMore')} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.whyUs')}
          </h2>
          <p className="text-text-muted text-lg mb-12">
            {t('home.whyUsText')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Professional Instructors</h3>
              <p className="text-text-muted text-sm">Experienced trainers with competitive backgrounds</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Modern Facility</h3>
              <p className="text-text-muted text-sm">Fully equipped gym with quality mats and equipment</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Family Atmosphere</h3>
              <p className="text-text-muted text-sm">Welcoming community for all skill levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {t('home.trialClass')}
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-colors"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
