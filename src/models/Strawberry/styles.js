import styled from "styled-components";
import { Box } from "reflexbox";

export const Value = styled(Box)`
  font-size: 0.85rem;

  @media (max-width: 992px) {
    font-size: 0.85rem;
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const Info = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  min-width: 60%;
  ${"" /* height: 20px; */} color: white;
  border-radius: 5px;
  letter-spacing: 1px;
  margin: 0 auto;
  padding-top: 1px;
  padding-bottom: 1px;

  @media (max-width: 992px) {
    font-size: 0.75rem;
    min-width: 60%;
  }
  @media (max-width: 768px) {
    font-size: 0.65rem;
    min-width: 80%;
  }
`;

export const A = styled.a`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 10px;
  color: #828282;
`;
