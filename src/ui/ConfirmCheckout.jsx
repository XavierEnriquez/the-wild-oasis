/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCheckout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckout({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCheckout>
      <Heading as="h3">Check out</Heading>
      <p>
        Are you sure {resourceName} is checking out? <br /> This action cannot
        be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          onClick={onCloseModal}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Yes, Check out
        </Button>
      </div>
    </StyledConfirmCheckout>
  );
}

export default ConfirmCheckout;
