// Criar um para cada tipo de tipo de botão????
export type AllowedKeysMappingType = {
    [key:string]: {
        value: string;
        symbol: string;
        perform: () => void;
    };
}