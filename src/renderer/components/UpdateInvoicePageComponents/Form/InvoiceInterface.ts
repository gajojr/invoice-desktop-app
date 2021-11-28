export default interface InvoiceInterface {
  toAddress: string;
  toCity: string;
  toPib: string;
  closingDate: string;
  fromCompany: string;
  id: number;
  invoiceName: string;
  pdv: boolean;
  signNeeded: boolean;
  stampNeeded: boolean;
  userId: number;
}
