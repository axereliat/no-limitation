import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo_url: string | null;
  disciplines: string[];
}

export default function About() {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      const { data } = await supabase
        .from('instructors')
        .select('*')
        .order('display_order');

      if (data) setInstructors(data);
    };
    fetchInstructors();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-6">
            {t('about.title')}
          </h1>
          <p className="text-text-muted text-lg">
            "Using no way as a way, having No Limitation as limitation."
          </p>
          <p className="text-accent mt-2">- Bruce Lee</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">
            {t('about.history')}
          </h2>
          <div className="bg-secondary rounded-xl p-8 border-l-4 border-accent">
            <p className="text-text-muted leading-relaxed text-lg">
              {t('about.historyText')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">
            {t('about.philosophy')}
          </h2>
          <div className="bg-primary rounded-xl p-8">
            <p className="text-text-muted leading-relaxed text-lg">
              {t('about.philosophyText')}
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-10 text-center">
            {t('about.instructors')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-secondary rounded-xl p-6 text-center hover:border-accent border border-transparent transition-colors"
              >
                {instructor.photo_url ? (
                  <img
                    src={instructor.photo_url}
                    alt={instructor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-accent"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-primary flex items-center justify-center border-4 border-accent">
                    <span className="text-4xl text-accent">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">
                  {instructor.name}
                </h3>
                {instructor.title && (
                  <p className="text-accent text-sm mb-2">{instructor.title}</p>
                )}
                {instructor.disciplines?.length > 0 && (
                  <p className="text-text-muted text-sm mb-3">
                    {instructor.disciplines.join(' • ')}
                  </p>
                )}
                {instructor.bio && (
                  <p className="text-text-muted text-sm">{instructor.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JKD Lineage Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">
            {t('about.lineage')}
          </h2>
          <div className="bg-primary rounded-xl p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Bruce Lee</p>
                <p className="text-text-muted">Founder of Jeet Kune Do</p>
              </div>
              <div className="text-accent text-2xl">↓</div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Dan Inosanto</p>
                <p className="text-text-muted">Senior Student of Bruce Lee</p>
              </div>
              <div className="text-accent text-2xl">↓</div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Rick Faye</p>
                <p className="text-text-muted">Full Instructor under Dan Inosanto</p>
              </div>
              <div className="text-accent text-2xl">↓</div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Genko Simeonov & Pantaley Gergov</p>
                <p className="text-text-muted">Senior Instructors - No Limitation Fight Club</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">
            {t('about.facilities')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-xl p-6 border-l-4 border-accent">
              <h3 className="text-xl font-bold text-white mb-3">Training Area</h3>
              <ul className="text-text-muted space-y-2">
                <li>• Professional MMA mats</li>
                <li>• Full-size boxing ring</li>
                <li>• Heavy bags & speed bags</li>
                <li>• Grappling dummies</li>
              </ul>
            </div>
            <div className="bg-secondary rounded-xl p-6 border-l-4 border-accent">
              <h3 className="text-xl font-bold text-white mb-3">Equipment</h3>
              <ul className="text-text-muted space-y-2">
                <li>• Focus mitts & Thai pads</li>
                <li>• Kickboxing shields</li>
                <li>• Eskrima sticks & training knives</li>
                <li>• Protective gear available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent mb-6">
            {t('about.partnership')}
          </h2>
          <div className="bg-primary rounded-xl p-8">
            <p className="text-text-muted text-lg">
              {t('about.partnershipText')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
