import InvoiceDataInterface from '../InvoiceDataInterface';

const SignAndPDVInfo = ({
  invoiceData,
}: {
  invoiceData: InvoiceDataInterface;
}) => {
  return (
    <div>
      <p>Potpis obavezan: {invoiceData.signNeeded ? 'DA' : 'NE'}</p>
      <p>Pecat obavezan: {invoiceData.stampNeeded ? 'DA' : 'NE'}</p>
      <h2>PDV INFO</h2>
      <p>
        {invoiceData.pdv
          ? 'Poreznik je u pdv sistemu'
          : 'Poreznik nije u pdv sistemu'}
      </p>
    </div>
  );
};

export default SignAndPDVInfo;
