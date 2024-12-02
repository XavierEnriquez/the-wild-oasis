import styled, { css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.type === "horizontal" &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    `}
`;

export default Row;
