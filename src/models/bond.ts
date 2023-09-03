export interface Bond {
    id: string
    isin: string;
    symbol: string;
    symbolEn: string;
    name: string;
    nameEn: string;
    issuerClass: string;
    type1: string;
    type2: string;
    currency: string;
    numOfPayments: number;
    emissionVolume: number;
    parValue: number;
    couponRate: number; 
    issueDate: string;
    maturityDay: string;
    accrualStartDate: string;
  }
  