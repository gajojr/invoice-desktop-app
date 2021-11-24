import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { InvoiceInterface } from '../InvoiceInterface';
import { CardsContainer, CardContainer } from './InvoicesList.styles';
import InvoiceCard from '../InvoiceCard/InvoiceCard.component';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);

  useEffect(() => {
    console.log('Broj faktura', invoices.length);
    console.log(invoices);
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
      <span>Vase fakture:</span>
      <CardContainer>
        {invoices.map((invoice: InvoiceInterface) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </CardContainer>
    </CardsContainer>
  );
};

export default InvoicesList;
