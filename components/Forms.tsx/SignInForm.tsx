import { Form as RForm, Field } from 'react-final-form';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Input } from '..';
import { composeValidators, required, isEmail } from '../../utils/validators';
import i18n from '../../public/static/i18n.json';

interface Props {
    locale: keyof typeof i18n;
    handleSubmit: (values: any) => void;
    isPending: boolean;
}
const SignInForm = ({ locale, handleSubmit, isPending }: Props) => {
    return (
        <RForm
            onSubmit={handleSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="email"
                            validate={composeValidators(
                                required(locale),
                                isEmail(locale)
                            )}
                        >
                            {({ input, meta }) => {
                                return (
                                    <div>
                                        <Input
                                            input={input}
                                            label="Email"
                                            type="email"
                                            htmlFor="email"
                                            placeholder="you@email.com"
                                            meta={meta}
                                        />
                                    </div>
                                );
                            }}
                        </Field>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="group relative w-full flex justify-center p-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-white group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                {i18n[locale].signIn}
                            </button>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default SignInForm;
