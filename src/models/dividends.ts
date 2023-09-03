export interface Dividend {
    value: number;
    date: string;
}

export interface Dividends {
    id: string;
    isin: string;
    dividend: Dividend[];
    version: number;
}