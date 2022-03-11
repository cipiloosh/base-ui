interface Props {
    children: string;
}

const PButon = ({ children }: Props) => {
    return (
        <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
        >
            {children}
        </button>
    );
};

export default PButon;
