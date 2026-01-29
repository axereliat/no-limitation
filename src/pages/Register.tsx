import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@/contexts/AuthContext';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function Register() {
    const {t} = useTranslation();
    const {signUp} = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!fullName || !email || !password || !confirmPassword) {
            setError(t('auth.allFieldsRequired'));

            return;
        }

        if (password !== confirmPassword) {
            setError(t('auth.passwordMismatch'));
            return;
        }

        if (password.length < 6) {
            setError(t('auth.passwordTooShort'));
            return;
        }

        setLoading(true);

        const {error} = await signUp(email, password, fullName);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-secondary rounded-lg p-8 shadow-lg text-center">
                        <div className="text-accent text-5xl mb-4">✓</div>
                        <h1 className="text-2xl font-bold text-white mb-4">
                            {t('auth.registrationSuccess')}
                        </h1>
                        <p className="text-text-muted mb-6">
                            {t('auth.checkEmail')}
                        </p>
                        <Link to="/login">
                            <Button
                                type="submit"
                                disabled={loading}
                                variant="default"
                            >
                                {t('auth.goToLogin')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-secondary rounded-lg p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">
                        {t('auth.register')}
                    </h1>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName" className="text-white">
                                {t('auth.fullName')}
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 bg-[#1a1a1a] border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent/50"
                            />
                        </div>

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

                        <div>
                            <Label htmlFor="confirmPassword" className="text-white">
                                {t('auth.confirmPassword')}
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 bg-[#1a1a1a] border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent/50"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="default"
                        >
                            {loading ? t('auth.registering') : t('auth.register')}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-text-muted">
                        {t('auth.hasAccount')}{' '}
                        <Link to="/login" className="text-accent hover:underline">
                            {t('auth.login')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
