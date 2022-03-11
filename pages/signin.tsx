import Image from 'next/image';
import SignInForm from '../components/Forms.tsx/SignInForm';
import i18n from '../public/static/i18n.json';
import { useRouter } from 'next/router';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetcher from '../utils/fetcher';
import { Loading } from '../components';
import cookie from '../utils/cookie';

const { NEXT_PUBLIC_API_URL } = process.env;

interface Props {
    locale: keyof typeof i18n;
}

const getJwt = async (token: string) => {
    const data = await fetch('/api/auth/getAuthToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    });

    const response = data.json();

    return response;
};

export default function Login({ locale }: Props) {
    const { push, query, isReady } = useRouter();

    const { data: queryData, error: errorData } = useQuery(
        'user',
        fetcher('/api/user/me'),
        {
            refetchOnWindowFocus: false,
            retry: false,
        }
    );

    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [jwt, setJwt] = useState(null);

    const handleSubmit = (values: any) => {
        setIsPending(true);
        fetch(`/api/auth/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    return res.json();
                }
                throw new Error('Someting went wrong');
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error);
                setIsPending(false);
            });
    };

    useEffect(() => {
        const getJwtToken = async (tokenParam: string) => {
            const searchRegExp = /\s/g;
            const replaceWith = '+';
            const token = tokenParam.replace(searchRegExp, replaceWith);

            const response = await getJwt(token as string);

            if (response.authToken) {
                setJwt(response.authToken);
            }
        };
        if (isReady && query.token) {
            getJwtToken(query.token as string);
        }
    }, [isReady, query.token]);

    if (!isReady) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <Loading />
                </div>
            </div>
        );
    }

    queryData && push('/dashboard');

    if (isReady && query.token && !jwt) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red">
                        <XIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-2 text-xl text-gray-500">
                        Invalid or expired token
                    </p>
                </div>
            </div>
        );
    }

    if (isReady && query.token && jwt) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green">
                        <CheckIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-2 text-xl text-gray-500">
                        Logged with success
                    </p>
                </div>
            </div>
        );
    }

    if (data) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green">
                        <CheckIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-2 text-xl text-gray-500">
                        Check your email! We&apos;ve sent a login link to your
                        email address.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red">
                        <XIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </div>

                    <p className="mt-2 text-xl text-gray-500">
                        Someting went wrong with you login.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="text-center">
                        <Image
                            alt="Logo"
                            src={'/logoLogin.svg'}
                            width={80}
                            height={80}
                        />
                    </div>

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {i18n[locale].signInTitle}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {i18n[locale].signInDesc}
                    </p>
                </div>
                <div className="mt-8">
                    <SignInForm
                        locale={locale}
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context: {
    locale: keyof typeof i18n;
    defaultLocale: keyof typeof i18n;
}) {
    const { locale, defaultLocale } = context;

    return {
        props: { locale: locale || defaultLocale },
    };
}
