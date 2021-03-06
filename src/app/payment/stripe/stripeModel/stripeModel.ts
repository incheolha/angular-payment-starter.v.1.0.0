export class StripeModel {

    constructor( public cardHolderName?: string,
                 public cardHolderEmail?: string,
                 public cardHolderZip?: string,
                 public tokenId?: string,
                 public amount?: number,
                 public cardNumber?: string,
                 public cardExpiry?: string,
                 public cardCvc?: string) 
                {}
}