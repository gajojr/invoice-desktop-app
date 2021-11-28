import { useParams } from 'react-router-dom';

import Form from '../../components/UpdateInvoicePageComponents/Form/Form.component';

import { UpdateInvoicePageContainer } from './UpdateInvoicePage.style';

const UpdateInvoicePage = () => {
  const { id }: { id: string } = useParams();

  return (
    <UpdateInvoicePageContainer>
      <Form id={id} />
    </UpdateInvoicePageContainer>
  );
};

export default UpdateInvoicePage;
