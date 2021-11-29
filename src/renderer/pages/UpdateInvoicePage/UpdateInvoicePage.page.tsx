import { useParams } from 'react-router-dom';

import Form from '../../components/UpdateInvoicePageComponents/Form/Form.component';
import { StyledLink } from '../CreateInvoicePage/CreateInvoicePage.style';

import UpdateInvoicePageContainer from './UpdateInvoicePage.style';

const UpdateInvoicePage = () => {
  const { id }: { id: string } = useParams();

  return (
    <UpdateInvoicePageContainer>
      <nav>
        <StyledLink to="/">Pocetna</StyledLink>
        <StyledLink to="/create-invoice">Kreiraj fakturu</StyledLink>
      </nav>
      <Form id={id} />
    </UpdateInvoicePageContainer>
  );
};

export default UpdateInvoicePage;
