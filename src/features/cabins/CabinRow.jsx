import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import styled from "styled-components";
import toast from "react-hot-toast";

import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import CreateEditCabinForm from "./CreateEditCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin succesfully deleted");

      // invalidate the "cabins" cache to force an api call refresh
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <p>Fits up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <ButtonGroup>
          <Button
            size="small"
            variation="secondary"
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variation="secondary"
            onClick={() => mutate(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </ButtonGroup>
      </TableRow>
      {showForm && <CreateEditCabinForm cabinToEdit={cabin} />}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default CabinRow;
