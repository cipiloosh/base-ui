import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { FieldRenderProps } from 'react-final-form';
import { cssClasses } from '../utils';

export default function Input({
    type,
    htmlFor,
    placeholder,
    defaultValue,
    label,
    error,
    input,
    meta,
}: FieldRenderProps<string, any>) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-black"
            >
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    {...input}
                    type={type}
                    name="email"
                    id={htmlFor}
                    className={cssClasses(
                        meta.error && meta.touched
                            ? 'border-red text-red placeholder-red focus:ring-red focus:border-red'
                            : '',
                        'block w-full pr-10  focus:outline-none  sm:text-sm rounded-md border-gray focus:ring-gray-1 focus:border-gray-1'
                    )}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {error && (
                        <ExclamationCircleIcon className="h-5 w-5 text-red" />
                    )}
                </div>
            </div>
            {meta.error && meta.touched && (
                <p className="mt-2 text-sm text-red" id="email-error">
                    {meta.error}
                </p>
            )}
        </div>
    );
}
