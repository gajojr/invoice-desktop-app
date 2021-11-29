import {
  CreateInvoicePageContainer,
  StyledLink,
} from './CreateInvoicePage.style';
import Form from '../../components/CreateInvoicePageComponents/Form/Form.component';

const CreateInvoicePage = () => {
  return (
    <CreateInvoicePageContainer>
      <StyledLink to="/">Pocetna</StyledLink>
      <Form />
    </CreateInvoicePageContainer>
  );
};

export default CreateInvoicePage;
