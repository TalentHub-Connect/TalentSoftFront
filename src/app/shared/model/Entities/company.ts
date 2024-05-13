export interface company {
    id?: number;
    namecompany: string;
    nit: string;
    namelegalrepresentative?: string | null;
    idlegalrepresentative?: number | null;
    email: string;
    phonecompany: string;
    numworkers: number;
    address: string;
    linkdate: string;
    subscriptionendate: string;
    status: string;
    planid?: number;
}