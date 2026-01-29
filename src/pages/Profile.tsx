import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@/contexts/AuthContext';
import {supabase} from '@/lib/supabase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import toast from "react-hot-toast";

export default function Profile() {
    const {t} = useTranslation();
    const {user, profile} = useAuth();

    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFullName(profile.full_name || '');
            setAvatarUrl(profile.avatar_url);
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const {error} = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user?.id);

        if (error) {
            console.error('Error updating profile:', error);
        } else {
            toast.success(t('common.savedChanges'));
        }
        setLoading(false);
    };

    return (
        <div className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">
                    {t('auth.profile')}
                </h1>

                <div className="bg-secondary rounded-lg p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-white">
                                {t('auth.email')}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="mt-1 bg-primary border-gray-600 text-text-muted"
                            />
                        </div>

                        <div>
                            <Label htmlFor="fullName" className="text-white">
                                {t('auth.fullName')}
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 bg-primary border-gray-600 text-white"
                            />
                        </div>

                        <div>
                            <Label className="text-white">{t('auth.role')}</Label>
                            <p className="mt-1 text-text-muted capitalize">
                                {profile?.role || 'user'}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                variant="default"
                            >
                                {loading ? t('common.saving') : t('common.save')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
