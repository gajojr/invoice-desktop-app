import InvoiceDataInterface from '../InvoiceDataInterface';

const ToUser = ({ invoiceData }: { invoiceData: InvoiceDataInterface }) => {
  return (
    <div>
      <h3>Kome:</h3>
      <p>Preduzece: {invoiceData.toCompany}</p>
      <p>Adresa: {invoiceData.toAddress}</p>
      <p>Grad: {invoiceData.toCity}</p>
      <p>PIB: {invoiceData.toPib}</p>
    </div>
  );
};

export default ToUser;
