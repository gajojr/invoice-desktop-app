export default interface InvoiceInterface {
  toAddress: string;
  toCity: string;
  toPib: string;
  closingDate: string;
  toCompany: string;
  id: number;
  invoiceName: string;
  pdv: boolean;
  signNeeded: boolean;
  stampNeeded: boolean;
  userId: number;
}
