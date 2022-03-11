import i18n from '../../public/static/i18n.json';

const required = (locale: keyof typeof i18n) => (value: string | number) =>
    value ? undefined : i18n[locale].required;

const minValue = (min: number) => (value: string) =>
    value.length >= min ? undefined : `Should be greater than ${min}`;

const isEmail = (locale: keyof typeof i18n) => (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? i18n[locale].invalidEmail
        : undefined;

const composeValidators =
    (...validators: any) =>
    (value: any) =>
        validators.reduce(
            (error: any, validator: any) => error || validator(value),
            undefined
        );

export { minValue, required, composeValidators, isEmail };
