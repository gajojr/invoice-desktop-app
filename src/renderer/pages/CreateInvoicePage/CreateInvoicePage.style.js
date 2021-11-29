import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const CreateInvoicePageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  @media (max-width: 575px) {
    align-items: flex-start;
  }
`;

export const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: underline;
  font-size: 1.5rem;

  &:hover {
    color: #000000;
    text-decoration: underline;
  }

  &::visited {
    color: #000000;
  }
`;
