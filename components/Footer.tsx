import Dropdown from './Dropdown';

type Props = { locales: string[]; setLocale: string };

export default function Footer({ locales, setLocale }: Props) {

    return (
        <footer className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <Dropdown up values={locales} setValue={setLocale} isLang />
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2022 Ciprian
                    </p>
                </div>
            </div>
        </footer>
    );
}
