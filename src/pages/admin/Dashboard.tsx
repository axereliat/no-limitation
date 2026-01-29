import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    newSubmissions: 0,
    totalClasses: 0,
    totalInstructors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [submissions, classes, instructors] = await Promise.all([
        supabase
          .from('contact_submissions')
          .select('id', { count: 'exact' })
          .eq('status', 'new'),
        supabase.from('classes').select('id', { count: 'exact' }),
        supabase.from('instructors').select('id', { count: 'exact' }),
      ]);

      setStats({
        newSubmissions: submissions.count || 0,
        totalClasses: classes.count || 0,
        totalInstructors: instructors.count || 0,
      });
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: t('admin.newSubmissions'),
      value: stats.newSubmissions,
      link: '/admin/submissions',
      color: 'bg-red-500/20 border-red-500',
    },
    {
      title: t('admin.totalClasses'),
      value: stats.totalClasses,
      link: '/admin/classes',
      color: 'bg-blue-500/20 border-blue-500',
    },
    {
      title: t('admin.totalInstructors'),
      value: stats.totalInstructors,
      link: '/admin/instructors',
      color: 'bg-green-500/20 border-green-500',
    },
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('admin.dashboard')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className={`p-6 rounded-lg border ${card.color} hover:opacity-80 transition-opacity`}
            >
              <h2 className="text-lg text-text-muted mb-2">{card.title}</h2>
              <p className="text-4xl font-bold text-white">{card.value}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">
            {t('admin.quickLinks')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/martial-arts"
              className="bg-secondary p-4 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="text-white">{t('admin.manageMartialArts')}</span>
            </Link>
            <Link
              to="/admin/classes"
              className="bg-secondary p-4 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="text-white">{t('admin.manageClasses')}</span>
            </Link>
            <Link
              to="/admin/instructors"
              className="bg-secondary p-4 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="text-white">{t('admin.manageInstructors')}</span>
            </Link>
            <Link
              to="/"
              className="bg-secondary p-4 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="text-white">{t('admin.viewSite')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
