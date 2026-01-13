import { useTranslation } from 'react-i18next';

export default function Schedule() {
  const { t } = useTranslation();

  const adultSchedule = [
    { day: 'monday', classes: [
      { time: '20:00', discipline: 'BJJ - Gi', disciplineBg: 'Бразилско Джиу Джицу - Ги' },
    ]},
    { day: 'tuesday', classes: [
      { time: '20:00', discipline: 'MMA Striking', disciplineBg: 'ММА стойка' },
    ]},
    { day: 'wednesday', classes: [
      { time: '19:00', discipline: 'Eskrima', disciplineBg: 'Ескрима' },
      { time: '20:00', discipline: 'Grappling No-Gi', disciplineBg: 'Граплинг Но-Ги' },
    ]},
    { day: 'thursday', classes: [
      { time: '20:00', discipline: 'BJJ - Gi', disciplineBg: 'Бразилско Джиу Джицу - Ги' },
    ]},
    { day: 'friday', classes: [
      { time: '20:00', discipline: 'MMA Striking', disciplineBg: 'ММА стойка' },
    ]},
    { day: 'saturday', classes: [
      { time: '18:00', discipline: 'Grappling No-Gi', disciplineBg: 'Граплинг Но-Ги' },
    ]},
    { day: 'sunday', classes: [
      { time: '17:00', discipline: 'Eskrima', disciplineBg: 'Ескрима' },
      { time: '18:00', discipline: 'MMA Striking', disciplineBg: 'ММА стойка' },
    ]},
  ];

  const kidsSchedule = [
    { day: 'monday', classes: [
      { time: '18:15-19:00', discipline: 'BJJ - Gi', disciplineBg: 'BJJ - Ги', age: '5-7' },
      { time: '19:00-20:00', discipline: 'BJJ - Gi', disciplineBg: 'BJJ - Ги', age: '8-13' },
    ]},
    { day: 'tuesday', classes: [
      { time: '19:00', discipline: 'JKD Kickbox', disciplineBg: 'JKD кикбокс', age: '8-13' },
    ]},
    { day: 'wednesday', classes: [] },
    { day: 'thursday', classes: [
      { time: '18:15-19:00', discipline: 'BJJ - Gi', disciplineBg: 'BJJ - Ги', age: '5-7' },
      { time: '19:00-20:00', discipline: 'BJJ - Gi', disciplineBg: 'BJJ - Ги', age: '8-13' },
    ]},
    { day: 'friday', classes: [
      { time: '19:00', discipline: 'JKD Kickbox', disciplineBg: 'JKD кикбокс', age: '8-13' },
    ]},
    { day: 'saturday', classes: [] },
    { day: 'sunday', classes: [] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6">
            {t('schedule.title')}
          </h1>
          <p className="text-text-muted text-lg">
            {t('schedule.subtitle')}
          </p>
        </div>
      </section>

      {/* Adult Schedule */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{t('schedule.adultClasses')}</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  {adultSchedule.map((day) => (
                    <th key={day.day} className="px-4 py-4 text-center text-accent font-semibold min-w-[140px]">
                      {t(`schedule.${day.day}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-secondary">
                  {adultSchedule.map((day) => (
                    <td key={day.day} className="px-4 py-6 text-center align-top">
                      {day.classes.length > 0 ? (
                        <div className="space-y-3">
                          {day.classes.map((classItem, idx) => (
                            <div key={idx} className="bg-accent/20 rounded-lg p-3">
                              <p className="text-white font-semibold text-sm">{classItem.time}</p>
                              <p className="text-accent text-sm mt-1">{classItem.discipline}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {adultSchedule.map((day) => (
              day.classes.length > 0 && (
                <div key={day.day} className="bg-secondary rounded-xl p-4">
                  <h3 className="text-accent font-semibold mb-3">{t(`schedule.${day.day}`)}</h3>
                  <div className="space-y-2">
                    {day.classes.map((classItem, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-primary rounded-lg p-3">
                        <span className="text-white font-medium">{classItem.time}</span>
                        <span className="text-accent text-sm">{classItem.discipline}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Kids Schedule */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">{t('schedule.kidsClasses')}</h2>
          <p className="text-text-muted mb-8">{t('schedule.kidsAges')}</p>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary">
                  {kidsSchedule.map((day) => (
                    <th key={day.day} className="px-4 py-4 text-center text-accent font-semibold min-w-[140px]">
                      {t(`schedule.${day.day}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-primary">
                  {kidsSchedule.map((day) => (
                    <td key={day.day} className="px-4 py-6 text-center align-top bg-primary/50">
                      {day.classes.length > 0 ? (
                        <div className="space-y-3">
                          {day.classes.map((classItem, idx) => (
                            <div key={idx} className="bg-accent/20 rounded-lg p-3">
                              <p className="text-white font-semibold text-sm">{classItem.time}</p>
                              <p className="text-accent text-sm mt-1">{classItem.discipline}</p>
                              <p className="text-text-muted text-xs mt-1">{classItem.age} {t('schedule.years')}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {kidsSchedule.map((day) => (
              day.classes.length > 0 && (
                <div key={day.day} className="bg-primary rounded-xl p-4">
                  <h3 className="text-accent font-semibold mb-3">{t(`schedule.${day.day}`)}</h3>
                  <div className="space-y-2">
                    {day.classes.map((classItem, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-secondary rounded-lg p-3">
                        <div>
                          <span className="text-white font-medium">{classItem.time}</span>
                          <span className="text-text-muted text-xs ml-2">({classItem.age} {t('schedule.years')})</span>
                        </div>
                        <span className="text-accent text-sm">{classItem.discipline}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('schedule.questions')}</h2>
          <p className="text-text-muted mb-6">{t('schedule.contactUs')}</p>
          <a
            href="/contact"
            className="inline-block bg-accent text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            {t('nav.contact')}
          </a>
        </div>
      </section>
    </div>
  );
}
