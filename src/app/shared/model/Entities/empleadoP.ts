export interface empleado {
    id?: number; 
    name: string;
    surname: string;
    phonenumber: number;
    departament: string;
    benefitsid: number;
    planid: number
    contractid?:number;
    companyid: number;
}