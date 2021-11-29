import { Link, useParams } from 'react-router-dom';
import GeneratePDFButton from '../../components/InvoicePageComponents/GeneratePDFButton/GeneratePDFButton.component';

import InvoicePaper from '../../components/InvoicePageComponents/InvoicePaper/InvoicePaper.component';
import { StyledLink } from '../CreateInvoicePage/CreateInvoicePage.style';

const InvoicePage = () => {
  const { id }: { id: string } = useParams();

  return (
    <main>
      <nav>
        <StyledLink to="/">Pocetna</StyledLink>
        <StyledLink to="/create-invoice">Kreiraj fakturu</StyledLink>
      </nav>
      <GeneratePDFButton />
      <InvoicePaper id={id} />
    </main>
  );
};

export default InvoicePage;
