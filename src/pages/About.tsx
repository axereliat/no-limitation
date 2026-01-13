import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6">
            {t('about.title')}
          </h1>
          <p className="text-text-muted text-lg">
            "No Limitation" - {t('about.philosophyText').split('.')[0]}.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{t('about.history')}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-text-muted leading-relaxed mb-6">
                {t('about.historyText')}
              </p>
              <blockquote className="border-l-4 border-accent pl-4 italic text-white">
                "Using no way as a way, having no limitation as limitation."
                <span className="block text-accent mt-2">- Bruce Lee</span>
              </blockquote>
            </div>
            <div className="bg-secondary rounded-xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-text-muted">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Club Photo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{t('about.philosophy')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Be Like Water</h3>
              <p className="text-text-muted text-sm">
                Adapt to any situation. Be flexible in technique and mindset.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Use What Works</h3>
              <p className="text-text-muted text-sm">
                No style is superior. Take effective techniques from all systems.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-xl">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">♾️</span>
              </div>
              <h3 className="text-white font-semibold mb-2">No Limitation</h3>
              <p className="text-text-muted text-sm">
                Break through physical and mental barriers. Constant evolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{t('about.instructors')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-xl overflow-hidden">
              <div className="h-48 bg-primary flex items-center justify-center">
                <svg className="w-24 h-24 text-text-muted opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-1">Genko Simeonov</h3>
                <p className="text-accent text-sm mb-3">Senior Instructor, Jeet Kune Do</p>
                <p className="text-text-muted text-sm">
                  Co-founder of NL Fight Club. Senior Instructor in Jeet Kune Do under the lineage of Bruce Lee, GM Richard Bustillo, and GM Lyubomir Yordanov.
                </p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl overflow-hidden">
              <div className="h-48 bg-primary flex items-center justify-center">
                <svg className="w-24 h-24 text-text-muted opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-1">Pantaley Gergov</h3>
                <p className="text-accent text-sm mb-3">Senior Instructor, Jeet Kune Do</p>
                <p className="text-text-muted text-sm">
                  Co-founder of NL Fight Club. Senior Instructor in Jeet Kune Do under the lineage of Bruce Lee, GM Richard Bustillo, and GM Lyubomir Yordanov.
                </p>
              </div>
            </div>
          </div>

          {/* JKD Lineage */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">{t('about.lineage')}</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <div className="bg-primary px-6 py-4 rounded-lg">
                <p className="text-white font-semibold">Bruce Lee</p>
                <p className="text-text-muted text-sm">Founder</p>
              </div>
              <span className="text-accent text-2xl">&rarr;</span>
              <div className="bg-primary px-6 py-4 rounded-lg">
                <p className="text-white font-semibold">GM Richard Bustillo</p>
                <p className="text-text-muted text-sm">IMB Academy</p>
              </div>
              <span className="text-accent text-2xl">&rarr;</span>
              <div className="bg-primary px-6 py-4 rounded-lg">
                <p className="text-white font-semibold">GM Lyubomir Yordanov</p>
                <p className="text-text-muted text-sm">IMASTI</p>
              </div>
              <span className="text-accent text-2xl">&rarr;</span>
              <div className="bg-accent px-6 py-4 rounded-lg">
                <p className="text-primary-foreground font-semibold">Genko Simeonov & Pantaley Gergov</p>
                <p className="text-primary-foreground/80 text-sm">NL Fight Club</p>
              </div>
            </div>
          </div>

          {/* Partnership */}
          <div className="mt-12 bg-secondary rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">{t('about.partnership')}</h3>
            <p className="text-text-muted">{t('about.partnershipText')}</p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{t('about.facilities')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥋</span>
              </div>
              <p className="text-white">Professional Mats</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥊</span>
              </div>
              <p className="text-white">Heavy Bags</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏋️</span>
              </div>
              <p className="text-white">Weight Area</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚿</span>
              </div>
              <p className="text-white">Showers & Lockers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
