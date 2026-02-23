import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface ClassItem {
  id: number;
  discipline: string;
  day_of_week: number;
  start_time: string;
  end_time: string | null;
  age_group: string;
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DISCIPLINES = ['BJJ - Gi', 'Grappling No-Gi', 'MMA Striking', 'JKD Kickbox', 'Eskrima', 'San Da'];
const AGE_GROUPS = ['adult', '5-7', '8-13'];

export default function Classes() {
  const { t } = useTranslation();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    discipline: DISCIPLINES[0],
    day_of_week: 0,
    start_time: '18:00',
    end_time: '19:30',
    age_group: 'adult',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('day_of_week')
      .order('start_time');

    if (error) {
      console.error('Error fetching classes:', error);
    } else {
      setClasses(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('classes')
        .update(formData)
        .eq('id', editingId);

      if (!error) {
        fetchClasses();
        resetForm();
        toast.success(t('common.savedChanges'));
      } else {
        toast.error(error.message);
      }
    } else {
      const { error } = await supabase.from('classes').insert([formData]);

      if (!error) {
        fetchClasses();
        resetForm();
        toast.success(t('common.savedChanges'));
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleEdit = (item: ClassItem) => {
    setFormData({
      discipline: item.discipline,
      day_of_week: item.day_of_week,
      start_time: item.start_time,
      end_time: item.end_time || '',
      age_group: item.age_group,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      const { error } = await supabase.from('classes').delete().eq('id', itemToDelete);

      if (!error) {
        setClasses((prev) => prev.filter((c) => c.id !== itemToDelete));
        toast.success(t('common.savedChanges'));
      } else {
        toast.error(error.message);
      }
    }
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      discipline: DISCIPLINES[0],
      day_of_week: 0,
      start_time: '18:00',
      end_time: '19:30',
      age_group: 'adult',
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-secondary to-secondary/50 rounded-xl p-8 mb-8 border-l-4 border-accent">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('admin.classes')}
          </h1>
          <p className="text-text-muted mb-6">
            {classes.length} {t('admin.totalClasses').toLowerCase()}
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="default"
            size="lg"
          >
            {showForm ? t('common.cancel') : '+ ' + t('admin.addClass')}
          </Button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-secondary rounded-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">{t('admin.discipline')}</Label>
                <select
                  value={formData.discipline}
                  onChange={(e) =>
                    setFormData({ ...formData, discipline: e.target.value })
                  }
                  className="w-full mt-1 p-2 bg-primary border border-gray-600 rounded text-white"
                >
                  {DISCIPLINES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white">{t('admin.dayOfWeek')}</Label>
                <select
                  value={formData.day_of_week}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      day_of_week: parseInt(e.target.value),
                    })
                  }
                  className="w-full mt-1 p-2 bg-primary border border-gray-600 rounded text-white"
                >
                  {DAYS.map((day, index) => (
                    <option key={day} value={index}>
                      {t(`schedule.${day}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white">{t('admin.ageGroup')}</Label>
                <select
                  value={formData.age_group}
                  onChange={(e) =>
                    setFormData({ ...formData, age_group: e.target.value })
                  }
                  className="w-full mt-1 p-2 bg-primary border border-gray-600 rounded text-white"
                >
                  {AGE_GROUPS.map((ag) => (
                    <option key={ag} value={ag}>
                      {ag === 'adult' ? t('schedule.adultClasses') : `${ag} ${t('schedule.years')}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white">{t('admin.startTime')}</Label>
                <Input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                  className="mt-1 bg-primary border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-white">{t('admin.endTime')}</Label>
                <Input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) =>
                    setFormData({ ...formData, end_time: e.target.value })
                  }
                  className="mt-1 bg-primary border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                type="submit"
                variant="outline"
              >
                {editingId ? t('common.save') : t('common.add')}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  {t('common.cancel')}
                </Button>
              )}
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-text-muted">
                  {t('admin.discipline')}
                </th>
                <th className="text-left py-3 px-4 text-text-muted">
                  {t('admin.dayOfWeek')}
                </th>
                <th className="text-left py-3 px-4 text-text-muted">
                  {t('admin.time')}
                </th>
                <th className="text-left py-3 px-4 text-text-muted">
                  {t('admin.ageGroup')}
                </th>
                <th className="text-right py-3 px-4 text-text-muted">
                  {t('admin.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-3 px-4 text-white">{item.discipline}</td>
                  <td className="py-3 px-4 text-white">
                    {t(`schedule.${DAYS[item.day_of_week]}`)}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {item.start_time.slice(0, 5)}
                    {item.end_time && ` - ${item.end_time.slice(0, 5)}`}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {item.age_group === 'adult'
                      ? t('schedule.adultClasses')
                      : `${item.age_group} ${t('schedule.years')}`}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="mr-2 border-gray-600 text-white"
                    >
                      {t('common.edit')}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(item.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      {t('common.delete')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        show={showConfirm}
        title={t('common.delete')}
        message={t('admin.confirmDelete')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
