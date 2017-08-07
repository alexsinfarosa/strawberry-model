import styled from "styled-components";
import { Box } from "reflexbox";
import { CSVLink } from "react-csv";

export const Value = styled(Box)`
  font-size: .85rem;

  @media (max-width: 992px) {
    font-size: .85rem;
  }
  @media (max-width: 768px) {
    font-size: .75rem;
  }
`;

export const Info = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .75rem;
  min-width: 60%;
  ${"" /* height: 20px; */}
  color: white;
  border-radius: 5px;
  letter-spacing: 1px;
  margin: 0 auto;
  padding-top: 1px;
  padding-bottom: 1px;

  @media (max-width: 992px) {
    font-size: .75rem;
    min-width: 60%;

  }
  @media (max-width: 768px) {
    font-size: .65rem;
    min-width: 80%;

  }
`;

export const A = styled.a`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 10px;
  color: #828282;
`;

export const CSVButton = styled(CSVLink)`
  color: #828282;
  margin-left: 5px;
  &:hover {
    color: #138FE9
  }
`;
