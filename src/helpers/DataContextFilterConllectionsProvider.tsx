import React,
{
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';

interface DadosFiltro {
    filtro: any | null;
    DataFilters(data: any): Promise<void>;
}
interface Props {
    children: React.ReactNode;
}

const DataContextFilter = createContext<DadosFiltro>({} as DadosFiltro);

export const DataContextFilterProvider: React.FC<Props> = ({ children }) => {
    const [filtro, setFiltro] = useState<object | null>(null);
    
    async function DataFilters(elem: any) {
        await setFiltro(elem);
    }

    return (
        <DataContextFilter.Provider
            value={{ 
                filtro: Object(filtro),
                DataFilters
            }}>
            {children}
        </DataContextFilter.Provider>        
    );
};

export function SetFilterData() {
    const context = useContext(DataContextFilter);
    return context;
}