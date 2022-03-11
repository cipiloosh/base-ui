module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        colors: {
            blue: '#05386B',
            white: '#FFFFFF',
            green: '#5cdb95',
            gray: '#dfe6e9',
            'gray-1': '#e6e7eb',
            black: '#000000',
            red: '#EE4F60',
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
