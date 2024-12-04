import styled, { css } from "styled-components";

const sizes = {
  small: css`
    max-width: 60rem;
    margin-right: auto;
  `,
  medium: css`
    max-width: 90rem;
    margin-right: auto;
  `,
  large: css`
    max-width: 120rem;
    margin-right: auto;
  `,
};
const Container = styled.div`
  ${(props) => sizes[props.size]}
`;

Container.defaultProps = {
  size: "large",
};

export default Container;
