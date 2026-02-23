import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="border-t border-primary mt-8 pt-8 text-center">
          <p className="text-text-muted text-sm">
            &copy; {currentYear} NL Fight Club. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
