
export class PaymentModel {

    constructor(
        public paymentID?: string,                       // Payment Id
        public paymentAgency?: string,                   // pay agency name?: stripe, paypal, etc
        public paymentType?: string,                     // ex) charge, refund, etc
        public paymentAmount?: number,                   // payment Amount
        public paymentTransactionFee?: number,           // payment Agency transaction Fee
        public paymentDate?: Date,                       // payment Date
        public paymentBalanceTransactionID?: string,     // paymentTranscationId
        public paymentCurrency?: string,                 // paymentCurrency ex)USD, JPY,
        public paymentCustomerID?: string,              // paymentCustomerID
        public paymentDescription?: string,             // paymentDescription

        public paymentResultStatus?: boolean,      // 은행으로부터 승인/미승인 여부
        public paymentResultReason?: string,      // 미승인시 미승인에 관한 이유
        public paymentResultMessage?: string,     // 판매자가 구매자에게 보내는 메세지.
        public paymentResultSummary?: string,     // 은행으로부터 온 결과 요약.

        public paymentDetailsID?: string,                   // paymentDetailsID
        public paymentDetailsPaymentType?: string,         // paymentDetailType ex)card, check,
        public paymentDetailsPaymentBillingZIP?: number,   // paymentBillingZipcode
        public paymentDetailsPaymentBrand?: string,        // paymentBrand ex) Visa, MasterCard..
        public paymentDetailsPaymentCountry?: string,      // paymentCountry ex)US, JPN, ....
        public paymentDetailsPaymentCustomerID?: string,   // paymentCustomerID
        public paymentDetailsPaymentCustomerEmail?: string, // paymentCustomerEmail

        public shippingStatus?: string,                     // shipping Status
        public shippingPayerEmail?: string,                 // payer Email
        public shippingPayerLastName?: string,              // payer Last Name
        public shippingPayerFirstName?: string,            // payer First Name
        public shippingPayerID?: string,                   // payer Id

        public shippingRecipientName?: string,      // shipping RecipientName
        public shippingAddressLine?: string,        // shipping AddressLine
        public shippingCity?: string,               // shipping city
        public shippingState?: string,               // shipping state
        public shippingPostalCode?: string,          // shipping poastal
        public shippingCountry?: string,              // shipping Country

        public paymentRefunded?: boolean,                // 환불 여부  true or false
        public refundAmount?: number,                   // refund Amount
        public refundDate?: Date,
        public refundReason?: string,

        ) { }
}

