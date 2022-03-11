import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import i18n from '../../base-ui/public/static/i18n.json';
import Link from 'next/link';
import { PButon } from '../components/';

const Home: NextPage = () => {
    const { locale, locales } = useRouter();

    return (
        <div>
            <Head>
                <title>UI - base template</title>
                <meta name="description" content="UI boilerplate for next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Link href="/signin" locale={locale}>
                <a>
                    {/* @ts-ignore */}
                    <PButon>{i18n[locale].signIn}</PButon>
                </a>
            </Link>
            <div className="fixed w-full bottom-0 bg-red-400">
                <Footer locales={locales || []} setLocale={locale || 'ro'} />
            </div>
        </div>
    );
};

export default Home;
