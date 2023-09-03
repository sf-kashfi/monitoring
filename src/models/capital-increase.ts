export interface CapitalChanges {
    newCapital: number;
    previousCapital: number;
    premiumPercent: number;
    reservePercent: number;
    contributionPercent: number;
    capitalChangePercent: number;
    date: string;
}

export interface CapitalIncrease {
    id: string;
    isin: string;
    capitalChanges: CapitalChanges[];
}