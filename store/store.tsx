import create from 'zustand';

interface Store {
    language: string;
    setLanguage: (language: string) => void;
}

const useStore = create<Store>((set): Store => {
    return {
        language: 'RO',
        setLanguage: (language: string) => set({ language }),
    };
});

export default useStore;
