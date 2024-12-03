import styled, { css } from "styled-components";

const sizes = {
  md: css`
    max-width: 60rem;
    margin-right: auto;
  `,
  lg: css`
    max-width: 90rem;
    margin-right: auto;
  `,
  xl: css`
    max-width: 120rem;
    margin-right: auto;
  `,
};
const Container = styled.div`
  ${(props) => sizes[props.size]}
`;

Container.defaultProps = {
  size: "lg",
};

export default Container;
