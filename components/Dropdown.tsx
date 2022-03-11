/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { cssClasses } from '../utils';
import { useState } from 'react';
import { cookie } from '../utils';
import { useRouter } from 'next/router';

type Props = {
    up?: boolean;
    values: string[];
    setValue: string;
    isLang?: boolean;
};

export default function Dropdown({ up, values, setValue, isLang }: Props) {
    const [selectedValue, setSelectedValue] = useState(setValue);
    const router = useRouter();

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSelectedValue(value);

        if (isLang) {
            cookie.set('NEXT_LOCALE', value, 3650);
            router.push('/', '/', { locale: value });
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray">
                    {selectedValue}
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={cssClasses(
                        up ? 'bottom-12' : '',
                        'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    )}
                >
                    <div className="py-1">
                        {values.map((value, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <option
                                        value={value}
                                        onClick={(e: any) => handleClick(e)}
                                        className={cssClasses(
                                            active
                                                ? 'bg-gray text-black'
                                                : 'text-black',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        {value}
                                    </option>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
