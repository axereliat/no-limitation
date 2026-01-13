import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MartialArtPageProps {
  artKey: 'jkd' | 'mma' | 'bjj' | 'sanda' | 'eskrima';
  heroImage?: string;
}

export default function MartialArtPage({ artKey }: MartialArtPageProps) {
  const { t } = useTranslation();

  const benefits = {
    jkd: [
      'Adaptability in combat situations',
      'Improved reflexes and timing',
      'Mental discipline and focus',
      'Self-defense skills',
      'Physical conditioning',
    ],
    mma: [
      'Complete fighting system',
      'Improved strength and endurance',
      'Self-confidence',
      'Weight management',
      'Stress relief',
    ],
    bjj: [
      'Ground fighting expertise',
      'Problem-solving mindset',
      'Full-body workout',
      'Self-defense without striking',
      'Mental resilience',
    ],
    sanda: [
      'Powerful striking combinations',
      'Takedown defense',
      'Competition readiness',
      'Cardiovascular fitness',
      'Quick footwork',
    ],
    eskrima: [
      'Weapon proficiency',
      'Enhanced coordination',
      'Practical self-defense',
      'Ambidextrous skills',
      'Cultural knowledge',
    ],
  };

  const training = {
    jkd: [
      'Trapping and interception drills',
      'Chi Sao (sticky hands) practice',
      'Footwork and mobility training',
      'Sparring sessions',
      'Wooden dummy techniques',
    ],
    mma: [
      'Striking combinations',
      'Takedown and wrestling drills',
      'Ground and pound practice',
      'Conditioning circuits',
      'Live sparring',
    ],
    bjj: [
      'Positional drilling',
      'Submission techniques',
      'Escape and reversal practice',
      'Rolling (live sparring)',
      'Competition preparation',
    ],
    sanda: [
      'Pad work combinations',
      'Kick drills',
      'Clinch and throw techniques',
      'Shuai Jiao wrestling',
      'Full-contact sparring',
    ],
    eskrima: [
      'Single and double stick work',
      'Knife defense drills',
      'Empty hand translations',
      'Sparring with protective gear',
      'Flow drills (sinawali)',
    ],
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6">
            {t(`martialArts.${artKey}.name`)}
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t(`martialArts.${artKey}.description`)}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Placeholder */}
            <div className="bg-secondary rounded-xl min-h-[400px] flex items-center justify-center">
              <div className="text-center text-text-muted">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Training Photo</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                {t(`martialArts.${artKey}.benefits`)}
              </h2>
              <ul className="space-y-4">
                {benefits[artKey].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            {t(`martialArts.${artKey}.training`)}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {training[artKey].map((item, index) => (
              <div
                key={index}
                className="bg-primary p-4 rounded-lg text-center"
              >
                <span className="text-accent font-bold text-xl">0{index + 1}</span>
                <p className="text-text-muted text-sm mt-2">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ready to start your {t(`martialArts.${artKey}.name`)} journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/schedule"
              className="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary transition-colors"
            >
              View Schedule
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:bg-accent-light transition-colors"
            >
              Book Trial Class
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
