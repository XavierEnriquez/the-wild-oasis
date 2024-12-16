/* eslint-disable react/prop-types */
import Button from "../../ui/Button";

function CheckoutButton({ onClick }) {
  return (
    <Button variation="primary" size="small" onClick={onClick}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
