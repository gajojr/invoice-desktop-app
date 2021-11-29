import styled from 'styled-components';

const UpdateInvoicePageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  @media (max-width: 575px) {
    align-items: flex-start;
  }
`;

export default UpdateInvoicePageContainer;
