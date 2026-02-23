import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@/contexts/AuthContext';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function Login() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {signIn} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError(t('auth.allFieldsRequired'));

            return;
        }

        setError('');
        setLoading(true);

        const {error} = await signIn(email, password);

        if (error) {
            setError(t('auth.invalidCredentials'));
            setLoading(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-secondary rounded-lg p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">
                        {t('auth.login')}
                    </h1>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-white">
                                {t('auth.email')}
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 bg-[#1a1a1a] border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent/50"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-white">
                                {t('auth.password')}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 bg-[#1a1a1a] border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent/50"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="default"
                        >
                            {loading ? t('auth.loggingIn') : t('auth.login')}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
