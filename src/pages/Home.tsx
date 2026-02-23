import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

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
    </div>
  );
}
