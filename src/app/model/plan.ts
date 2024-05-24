export class Plan {
  constructor(
   public id: number,
   public name: string,
   public description: string,
   public maxnumworkers: number,
   public price: number,
   public duration: string,
   public status: string,

  ){
  }

}
