import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import ConfirmModal from "@/components/ui/ConfirmModal.tsx";
import toast from "react-hot-toast";

interface MartialArt {
    id: number;
    title: string;
    sub_title: string | null;
    description: string | null;
    photo_url: string | null;
}

interface Advantage {
    id: number;
    title: string;
}

export default function Dashboard() {
    const {t} = useTranslation();
    const [martialArts, setMartialArts] = useState<MartialArt[]>([]);
    const [advantages, setAdvantages] = useState<Advantage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        sub_title: '',
        description: '',
        photo_url: '',
    });

    const [selectedAdvantages, setSelectedAdvantages] = useState<number[]>([]);
    const [selectedTraining, setSelectedTraining] = useState<number[]>([]);

    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
    }>({});

    const [newAdvantage, setNewAdvantage] = useState('');

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            const {error} = await supabase.from('martial_arts').delete().eq('id', itemToDelete);

            if (!error) {
                setMartialArts((prev) => prev.filter((m) => m.id !== itemToDelete));
                toast.success(t('common.savedChanges'));
            }
        }
        setShowConfirm(false);
        setItemToDelete(null);

        window.dispatchEvent(new CustomEvent('refreshData'));
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setItemToDelete(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            const {data: martialArtsData, error: martialArtsError} = await supabase
                .from('martial_arts')
                .select('*')
                .order('title');

            if (martialArtsError) {
                console.error('Error fetching martial arts:', martialArtsError);
            } else {
                setMartialArts(martialArtsData || []);
            }

            const {data: advantagesData, error: advantagesError} = await supabase
                .from('advantages')
                .select('id, title')
                .order('title');

            if (!advantagesError && advantagesData) {
                setAdvantages(advantagesData);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const fetchMartialArts = async () => {
        const {data, error} = await supabase
            .from('martial_arts')
            .select('*')
            .order('title');

        if (error) {
            console.error('Error fetching martial arts:', error);
        } else {
            setMartialArts(data || []);
        }

        window.dispatchEvent(new CustomEvent('refreshData'));
    };

    const fetchSelectedItems = async (martialArtId: number) => {
        const {data: advData} = await supabase
            .from('martial_arts_advantages')
            .select('advantage_id')
            .eq('martial_art_id', martialArtId);

        if (advData) {
            setSelectedAdvantages(advData.map(item => item.advantage_id));
        }

        const {data: trainData} = await supabase
            .from('martial_arts_training_process')
            .select('training_process_id')
            .eq('martial_art_id', martialArtId);

        if (trainData) {
            setSelectedTraining(trainData.map(item => item.training_process_id));
        }
    };

    const validateForm = () => {
        const newErrors: { title?: string; description?: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = t('validation.titleRequired');
        }

        if (!formData.description.trim()) {
            newErrors.description = t('validation.descriptionRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload = {
            title: formData.title,
            sub_title: formData.sub_title || null,
            description: formData.description || null,
            photo_url: formData.photo_url || null,
        };

        let martialArtId = editingId;

        if (editingId) {
            const {error} = await supabase
                .from('martial_arts')
                .update(payload)
                .eq('id', editingId);

            if (error) {
                console.error('Error updating martial art:', error);
                return;
            }
        } else {
            const {data, error} = await supabase
                .from('martial_arts')
                .insert([payload])
                .select()
                .single();

            if (error) {
                console.error('Error creating martial art:', error);
                return;
            }
            martialArtId = data.id;
        }

        if (martialArtId) {
            await saveRelationships(martialArtId);
        }

        fetchMartialArts();
        resetForm();
        toast.success(t('common.savedChanges'));
        window.dispatchEvent(new CustomEvent('refreshData'));
    };

    const saveRelationships = async (martialArtId: number) => {
        await supabase
            .from('martial_arts_advantages')
            .delete()
            .eq('martial_art_id', martialArtId);

        await supabase
            .from('martial_arts_training_process')
            .delete()
            .eq('martial_art_id', martialArtId);

        if (selectedAdvantages.length > 0) {
            const advantageRows = selectedAdvantages.map((advId, index) => ({
                martial_art_id: martialArtId,
                advantage_id: advId,
                position: index
            }));

            await supabase
                .from('martial_arts_advantages')
                .insert(advantageRows);
        }

        if (selectedTraining.length > 0) {
            const trainingRows = selectedTraining.map((trainId, index) => ({
                martial_art_id: martialArtId,
                training_process_id: trainId,
                position: index
            }));

            await supabase
                .from('martial_arts_training_process')
                .insert(trainingRows);
        }
    };

    const handleEdit = async (martialArt: MartialArt) => {
        setFormData({
            title: martialArt.title,
            sub_title: martialArt.sub_title || '',
            description: martialArt.description || '',
            photo_url: martialArt.photo_url || '',
        });
        setEditingId(martialArt.id);
        await fetchSelectedItems(martialArt.id);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            sub_title: '',
            description: '',
            photo_url: '',
        });
        setEditingId(null);
        setSelectedAdvantages([]);
        setSelectedTraining([]);
        setErrors({});
        setShowForm(false);
    };

    const toggleAdvantage = (id: number) => {
        setSelectedAdvantages(prev =>
            prev.includes(id)
                ? prev.filter(a => a !== id)
                : [...prev, id]
        );
    };

    const handleAddAdvantage = async () => {
        if (!newAdvantage.trim()) return;

        const {data, error} = await supabase
            .from('advantages')
            .insert([{title: newAdvantage.trim()}])
            .select()
            .single();

        if (!error && data) {
            setAdvantages(prev => [...prev, data]);
            setSelectedAdvantages(prev => [...prev, data.id]);
            setNewAdvantage('');
            toast.success(t('common.savedChanges'));
        } else if (error) {
            console.error('Error adding advantage:', error);
            toast.error(error.message);
        }
    };

    const handleDeleteAdvantage = async (id: number) => {
        const {error} = await supabase
            .from('advantages')
            .delete()
            .eq('id', id);

        if (!error) {
            setAdvantages(prev => prev.filter(a => a.id !== id));
            setSelectedAdvantages(prev => prev.filter(a => a !== id));
            toast.success(t('common.savedChanges'));
        } else {
            console.error('Error deleting advantage:', error);
            toast.error(error.message);
        }
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
                {/* Martial Arts Section */}
                <div className="bg-gradient-to-r from-secondary to-secondary/50 rounded-xl p-8 mb-8 border-l-4 border-accent">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('admin.martialArts')}
                    </h1>
                    <p className="text-text-muted mb-6">
                        {martialArts.length} {t('admin.totalMartialArts') || 'martial arts'}
                    </p>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        variant="default"
                        size="lg"
                    >
                        {showForm ? t('common.cancel') : '+ ' + t('admin.addMartialArt')}
                    </Button>
                </div>

                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="bg-secondary rounded-lg p-6 mb-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-white">{t('admin.martialArtTitle')} *</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({...formData, title: e.target.value});
                                        if (errors.title) setErrors({...errors, title: undefined});
                                    }}
                                    className={`mt-1 bg-[#1a1a1a] text-white ${
                                        errors.title
                                            ? 'border-red-500 border-2'
                                            : 'border-gray-700'
                                    }`}
                                    placeholder="Jeet Kune Do"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-white">{t('admin.martialArtSubTitle')}</Label>
                                <Input
                                    value={formData.sub_title}
                                    onChange={(e) => setFormData({...formData, sub_title: e.target.value})}
                                    className="mt-1 bg-[#1a1a1a] border-gray-700 text-white"
                                    placeholder={t('admin.subTitlePlaceholder')}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label className="text-white">{t('admin.description')} *</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({...formData, description: e.target.value});
                                        if (errors.description) setErrors({...errors, description: undefined});
                                    }}
                                    rows={4}
                                    className={`mt-1 bg-[#1a1a1a] text-white ${
                                        errors.description
                                            ? 'border-red-500 border-2'
                                            : 'border-gray-700'
                                    }`}
                                    placeholder={t('admin.descriptionPlaceholder')}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label className="text-white mb-3 block">{t('martialArts.benefits')}</Label>
                                <div className="bg-[#1a1a1a] rounded-lg p-4 max-h-48 overflow-y-auto">
                                    {advantages.length === 0 ? (
                                        <p className="text-gray-500 text-sm">{t('admin.noAdvantages')}</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {advantages.map((adv) => (
                                                <div
                                                    key={adv.id}
                                                    className="flex items-center gap-3 bg-secondary/50 border border-gray-700 hover:border-accent/50 p-3 rounded-lg group transition-colors"
                                                >
                                                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedAdvantages.includes(adv.id)}
                                                            onChange={() => toggleAdvantage(adv.id)}
                                                            className="w-4 h-4 accent-accent"
                                                        />
                                                        <span className="text-white text-sm">{adv.title}</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteAdvantage(adv.id)}
                                                        className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity px-2"
                                                        title={t('common.delete')}
                                                    >
                                                        −
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        value={newAdvantage}
                                        onChange={(e) => setNewAdvantage(e.target.value)}
                                        placeholder={t('admin.newAdvantagePlaceholder')}
                                        className="flex-1 bg-[#1a1a1a] border-gray-700 text-white text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddAdvantage();
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddAdvantage}
                                        variant="outline"
                                        size="icon"
                                        className="border-gray-600 text-white h-9 w-9 shrink-0"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-6">
                                <Button type="submit"
                                        variant="default"
                                        className="w-full"
                                >
                                    {editingId ? t('common.save') : t('common.add')}
                                </Button>
                                {editingId && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        className="w-full mt-2 border-gray-600 text-white"
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {martialArts.map((martialArt) => (
                        <div key={martialArt.id} className="bg-secondary rounded-lg overflow-hidden">
                            {martialArt.photo_url && (
                                <img
                                    src={martialArt.photo_url}
                                    alt={martialArt.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-base font-semibold text-white">
                                    {martialArt.title}
                                </h3>
                                {martialArt.sub_title && (
                                    <p className="text-accent text-sm mb-2">
                                        {martialArt.sub_title}
                                    </p>
                                )}
                                {martialArt.description && (
                                    <p className="text-text-muted text-sm mb-3 line-clamp-2">
                                        {martialArt.description}
                                    </p>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(martialArt)}
                                        className="flex-1 text-xs py-1.5 border border-gray-600 text-white rounded hover:border-accent hover:text-accent transition-colors"
                                    >
                                        {t('common.edit')}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(martialArt.id)}
                                        className="flex-1 text-xs py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        {t('common.delete')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {martialArts.length === 0 && !showForm && (
                    <div className="text-center py-12">
                        <p className="text-text-muted mb-4">{t('admin.noMartialArts')}</p>
                        <Button onClick={() => setShowForm(true)} variant="default">
                            {t('admin.addMartialArt')}
                        </Button>
                    </div>
                )}
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
