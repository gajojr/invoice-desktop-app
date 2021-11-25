export default interface InvoiceDataInterface {
  closing_date: string;
  // date_of_making: string;
  // from_address: string;
  // from_city: string;
  // from_company: string;
  // from_email: string;
  // from_giro_account: string;
  // from_lastname: string;
  // from_name: string;
  // from_pib: string;
  // from_postal_code: string;
  // from_username: string;
  invoiceName: string;
  pdv: boolean;
  signNeeded: boolean;
  stampNeeded: boolean;
  toAddress: string;
  toCity: string;
  toCompany: string;
  toPib: string;
}
