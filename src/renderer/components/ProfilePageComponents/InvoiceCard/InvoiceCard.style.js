import styled from 'styled-components';

import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

export const StyledCard = styled(Card)`
  flex: 1;
  min-width: 20vw;
  max-width: 50vw;

  @media (max-width: 992px) {
    min-width: 25vw;
  }

  @media (max-width: 700px) {
    min-width: 33vw;
  }

  @media (max-width: 490px) {
    min-width: 100%;
  }
`;

export const DeleteButton = styled(Button)`
  margin-left: 5px;
  background-color: #ff3333;
  border: none;

  &:hover {
    background-color: #e60000;
  }
`;

export const UpdateLink = styled(Link)`
  margin-left: 5px;
  padding: 8px;
  border-radius: 2px;
  background-color: #00b300;
  color: #fff;
  border: none;

  &:hover {
    background-color: rgba(0, 179, 0, 0.8);
    color: #fff;
  }
`;
