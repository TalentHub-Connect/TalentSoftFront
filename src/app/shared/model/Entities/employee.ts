export class Employee {
  constructor(
    public id : number,
    public name : string,
    public surname : string,
    public phoneNumber : string,
    public supportTicketsId : number,
    public benefitsId : number,
    public contractId : number,
    public planId : number,
    public companyId : number | null,
    public department : string,

    public username : string,

    public emergencycontact : number,
    public nameemergencycontact : string

  ){

  }
}
