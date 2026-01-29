import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {supabase} from '@/lib/supabase';

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
    position: number;
}

interface TrainingProcess {
    id: number;
    title: string;
    position: number;
}

export default function MartialArtPage() {
    const {id} = useParams();
    const {t} = useTranslation();

    const [martialArt, setMartialArt] = useState<MartialArt | null>(null);
    const [advantages, setAdvantages] = useState<Advantage[]>([]);
    const [trainingProcess, setTrainingProcess] = useState<TrainingProcess[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            setLoading(true);

            // Fetch martial art
            const {data: martialArtData, error: martialArtError} = await supabase
                .from('martial_arts')
                .select('*')
                .eq('id', id)
                .single();

            if (martialArtError) {
                console.error('Error fetching martial art:', martialArtError);
                setLoading(false);
                return;
            }

            setMartialArt(martialArtData);
            console.log('Martial Art:', martialArtData);

            // Fetch advantages through junction table
            const {data: advantagesData} = await supabase
                .from('martial_arts_advantages')
                .select(`
                    position,
                    advantages (
                        id,
                        title
                    )
                `)
                .eq('martial_art_id', id)
                .order('position');

            console.log('Advantages raw data:', advantagesData);
            if (advantagesData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mapped = advantagesData.map((item: any) => ({
                    id: item.advantages?.id ?? 0,
                    title: item.advantages?.title ?? '',
                    position: item.position
                }));
                console.log('Advantages mapped:', mapped);
                setAdvantages(mapped);
            }

            // Fetch training process through junction table
            const {data: trainingData} = await supabase
                .from('martial_arts_training_process')
                .select(`
                    position,
                    training_process (
                        id,
                        title
                    )
                `)
                .eq('martial_art_id', id)
                .order('position');

            console.log('Training raw data:', trainingData);
            if (trainingData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mapped = trainingData.map((item: any) => ({
                    id: item.training_process?.id ?? 0,
                    title: item.training_process?.title ?? '',
                    position: item.position
                }));
                console.log('Training mapped:', mapped);
                setTrainingProcess(mapped);
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (!martialArt) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">{t('common.notFound')}</h1>
                    <Link to="/" className="text-accent hover:underline">
                        {t('nav.home')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero */}
            <section className="py-20 px-4 bg-secondary">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
                        {martialArt.title}
                    </h1>
                    {martialArt.sub_title && (
                        <p className="text-white text-xl mb-6">{martialArt.sub_title}</p>
                    )}
                    {martialArt.description && (
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {martialArt.description}
                        </p>
                    )}
                </div>
            </section>

            {/* Benefits/Advantages */}
            {advantages.length > 0 && (
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">
                            {t('martialArts.benefits')}
                        </h2>
                        <ul className="max-w-2xl mx-auto space-y-4">
                            {advantages.map((advantage) => (
                                <li key={advantage.id} className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </span>
                                    <span className="text-text-muted">{advantage.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Training Process */}
            {trainingProcess.length > 0 && (
                <section className="py-20 px-4 bg-secondary">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">
                            {t('martialArts.training')}
                        </h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {trainingProcess.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="bg-primary p-4 rounded-lg text-center"
                                >
                                    <span className="text-accent font-bold text-xl">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-text-muted text-sm mt-2">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {t('martialArts.readyToStart', {name: martialArt.title})}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/schedule"
                            className="inline-block bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary transition-colors"
                        >
                            {t('martialArts.viewSchedule')}
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-block bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:bg-accent-light transition-colors"
                        >
                            {t('martialArts.bookTrial')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}