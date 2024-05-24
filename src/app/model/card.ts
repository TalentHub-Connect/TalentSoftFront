export class Card {
  constructor(
    public id: number,
    public cardNumber: string,
    public cardHolder: string,
    public cardMonth: string,
    public cardYear: string,
    public cardCvc: string,
    public autoRenewal: number,
    public holderEmail: string

  ) {
  }

}
