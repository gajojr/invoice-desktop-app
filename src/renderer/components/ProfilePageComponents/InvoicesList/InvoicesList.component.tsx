import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';
import { InvoiceInterface } from '../InvoiceInterface';
import { CardsContainer, CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/invoices');
        setInvoices(response.data);
      } catch (err: any) {
        message.error('Greska u aplikaciji!');
      }
    })();
  }, [invoices]);

  if (!invoices.length) {
    return (
      <>
        <h2 style={{ color: '#000' }}>
          Jos uvek niste napravili ni jednu fakturu.
        </h2>
        <Button type="primary">
          <h3>
            <Link to="/create-invoice" style={{ color: '#000' }}>
              Kreiraj novu fakturu
            </Link>
          </h3>
        </Button>
      </>
    );
  }

  return (
    <CardsContainer>
      <h2 style={{ color: '#000' }}>Vase fakture:</h2>
      <CardContainer>
        {invoices.map((invoice: InvoiceInterface) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </CardContainer>
    </CardsContainer>
  );
};

export default InvoicesList;
