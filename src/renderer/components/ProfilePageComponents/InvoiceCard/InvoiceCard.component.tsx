import axios from 'axios';
import { Link } from 'react-router-dom';
import { message } from 'antd';

import { InvoiceInterface } from '../InvoiceInterface';

import { StyledCard, DeleteButton, UpdateButton } from './InvoiceCard.style';

const InvoiceCard = ({ invoice }: { invoice: InvoiceInterface }) => {
  const deleteInvoice = async (id: number) => {
    if (window.confirm('Da li zelite da obrisete ovu fakturu?')) {
      try {
        const response = await axios.delete(`/invoices/${id}`);
        console.log(response);
        if (response.status === 200) {
          message.success('Faktura obrisana!');
          window.location.reload();
        } else {
          message.error('Brisanje nije uspelo!');
        }
      } catch (err: any) {
        message.error('Greska u aplikaciji!');

        sessionStorage.clear();
        window.location.href = '/';
      }
    }
  };

  return (
    <StyledCard
      size="small"
      title={invoice.name}
      extra={
        <div>
          <Link to={`/invoices/${invoice.id}`}>Pogledaj</Link>
          <UpdateButton
            onClick={() => {
              window.location.href = `/update-invoice/${invoice.id}`;
            }}
          >
            Azuriraj
          </UpdateButton>
          <DeleteButton
            type="primary"
            onClick={() => deleteInvoice(invoice.id)}
          >
            Obrisi
          </DeleteButton>
        </div>
      }
    >
      <p>Grad: {invoice.city}</p>
      <p>Adresa: {invoice.address}</p>
      <p>PIB: {invoice.pib}</p>
      <Link to={`/invoices/${invoice.id}`}>
        <p style={{ color: '#000' }}>...</p>
      </Link>
    </StyledCard>
  );
};

export default InvoiceCard;
