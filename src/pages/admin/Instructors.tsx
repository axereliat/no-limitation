import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {useTranslation} from 'react-i18next';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import ImageUpload from '@/components/ImageUpload';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface Instructor {
    id: number;
    name: string;
    title: string;
    bio: string;
    photo_url: string | null;
    disciplines: string[];
    display_order: number;
}

export default function Instructors() {
    const {t} = useTranslation();

    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        photo_url: '',
        disciplines: '',
        display_order: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('instructors')
                .select('*')
                .order('display_order');

            if (error) {
                console.error('Error fetching instructors:', error);
            } else {
                setInstructors(data || []);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            const {error} = await supabase.from('instructors').delete().eq('id', itemToDelete);

            if (!error) {
                setInstructors((prev) => prev.filter((i) => i.id !== itemToDelete));
            }
        }
        setShowConfirm(false);
        setItemToDelete(null);
        toast.success(t('common.savedChanges'));
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setItemToDelete(null);
    };

    const fetchInstructors = async () => {
        const {data, error} = await supabase
            .from('instructors')
            .select('*')
            .order('display_order');

        if (error) {
            console.error('Error fetching instructors:', error);
        } else {
            setInstructors(data || []);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            title: formData.title,
            bio: formData.bio,
            photo_url: formData.photo_url || null,
            disciplines: formData.disciplines.split(',').map((d) => d.trim()).filter(Boolean),
            display_order: formData.display_order,
        };

        if (editingId) {
            const {error} = await supabase
                .from('instructors')
                .update(payload)
                .eq('id', editingId);

            if (!error) {
                fetchInstructors();
                resetForm();
            }
        } else {
            const {error} = await supabase.from('instructors').insert([payload]);

            if (!error) {
                fetchInstructors();
                resetForm();
            }
        }
        toast.success(t('common.savedChanges'));
    };

    const handleEdit = (instructor: Instructor) => {
        setFormData({
            name: instructor.name,
            title: instructor.title || '',
            bio: instructor.bio || '',
            photo_url: instructor.photo_url || '',
            disciplines: instructor.disciplines?.join(', ') || '',
            display_order: instructor.display_order,
        });
        setEditingId(instructor.id);
        setShowForm(true);
    };


    const resetForm = () => {
        setFormData({
            name: '',
            title: '',
            bio: '',
            photo_url: '',
            disciplines: '',
            display_order: 0,
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
        <>
            <div className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            {t('admin.instructors')}
                        </h1>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-accent text-primary hover:bg-accent/90"
                        >
                            {showForm ? t('common.cancel') : t('admin.addInstructor')}
                        </Button>
                    </div>

                    {showForm && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-secondary rounded-lg p-6 mb-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 flex justify-center">
                                    <ImageUpload
                                        bucket="instructors"
                                        path={`instructor-${editingId || 'new'}`}
                                        currentUrl={formData.photo_url}
                                        onUpload={(url) => setFormData({...formData, photo_url: url})}
                                    />
                                </div>

                                <div>
                                    <Label className="text-white">{t('admin.instructorName')}</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({...formData, name: e.target.value})
                                        }
                                        required
                                        className="mt-1 bg-primary border-gray-600 text-white"
                                    />
                                </div>

                                <div>
                                    <Label className="text-white">{t('admin.instructorTitle')}</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({...formData, title: e.target.value})
                                        }
                                        className="mt-1 bg-primary border-gray-600 text-white"
                                        placeholder={t('admin.titlePlaceholder')}
                                    />
                                </div>

                                <div>
                                    <Label className="text-white">{t('admin.disciplines')}</Label>
                                    <Input
                                        value={formData.disciplines}
                                        onChange={(e) =>
                                            setFormData({...formData, disciplines: e.target.value})
                                        }
                                        className="mt-1 bg-primary border-gray-600 text-white"
                                        placeholder="JKD, MMA, BJJ"
                                    />
                                </div>

                                <div>
                                    <Label className="text-white">{t('admin.displayOrder')}</Label>
                                    <Input
                                        type="number"
                                        value={formData.display_order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                display_order: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        className="mt-1 bg-primary border-gray-600 text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label className="text-white">{t('admin.bio')}</Label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData({...formData, bio: e.target.value})
                                        }
                                        rows={4}
                                        className="mt-1 bg-primary border-gray-600 text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <Button
                                    type="submit"
                                    className="bg-accent text-primary hover:bg-accent/90"
                                >
                                    {editingId ? t('common.save') : t('common.add')}
                                </Button>
                                {editingId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        className="border-gray-600 text-white"
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instructors.map((instructor) => (
                            <div key={instructor.id} className="bg-secondary rounded-lg p-6">
                                {instructor.photo_url && (
                                    <img
                                        src={instructor.photo_url}
                                        alt={instructor.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                    />
                                )}
                                <h3 className="text-lg font-semibold text-white text-center">
                                    {instructor.name}
                                </h3>
                                {instructor.title && (
                                    <p className="text-accent text-sm text-center mb-2">
                                        {instructor.title}
                                    </p>
                                )}
                                {instructor.disciplines?.length > 0 && (
                                    <p className="text-text-muted text-sm text-center mb-4">
                                        {instructor.disciplines.join(', ')}
                                    </p>
                                )}
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(instructor)}
                                        className="flex-1 text-xs py-1.5 border border-gray-600 text-white rounded hover:border-accent hover:text-accent
  transition-colors"
                                    >
                                        {t('common.edit')}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteClick(instructor.id)}
                                        className="flex-1 text-xs py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white
  transition-colors"
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
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
        </>
    );
}
