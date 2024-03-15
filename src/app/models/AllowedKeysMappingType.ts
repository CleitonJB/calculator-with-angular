import { KeyTypes } from "./keyTypes";

export type AllowedKeysType = {
    type:    KeyTypes;
    value:   string;
    symbol:  string;
    perform: (key: AllowedKeysType) => void;
};

// Criar um para cada tipo de tipo de botão????
export type AllowedKeysMappingType = {
    [key:string]: {
        type:    KeyTypes;
        value:   string;
        symbol:  string;
        perform: (key: AllowedKeysType) => void;
    };
}