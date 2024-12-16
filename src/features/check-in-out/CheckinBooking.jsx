import { useEffect, useState } from "react";
import styled from "styled-components";

import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";
import { useBookingData } from "../bookings/useBookingData";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [breakfastPaid, setBreakfastPaid] = useState(false);

  const navigate = useNavigate();

  const { booking, isLoading } = useBookingData();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (!booking) return null;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuest,
    hasBreakfast,
    numNights,
    isPaid,
    status,
  } = booking;

  const addBreakfastPrice = settings?.breakfastPrice * numNights * numGuest;

  if (isLoading || isLoadingSettings) return <Spinner />;

  if (status === "checked-in") navigate(`/bookings/${bookingId}`);

  function handleCheckin() {
    if (!confirmPaid || (addBreakfast && !breakfastPaid)) return;

    if (breakfastPaid) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: addBreakfastPrice,
          totalPrice: totalPrice + addBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {isPaid && (
        <Box>
          <Checkbox
            id="prepaid"
            checked={isPaid}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            disabled={isPaid}
          >
            I confirm guest {guests.fullName} has paid the total amount of
            {formatCurrency(totalPrice)}
          </Checkbox>
        </Box>
      )}

      {!hasBreakfast && (
        <>
          <Box>
            <Checkbox
              id="add-breakfast"
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((add) => !add);
                // setConfirmPaid(false);
              }}
              disabled={isLoadingSettings || isCheckingIn}
            >
              Want to add breakfast for {formatCurrency(addBreakfastPrice)}?{" "}
            </Checkbox>
          </Box>
          {addBreakfast && isPaid && (
            <Box>
              <Checkbox
                id="confirm-breakfast"
                onChange={() => setBreakfastPaid((confirm) => !confirm)}
                disabled={isCheckingIn}
              >
                {formatCurrency(addBreakfastPrice)} Breakfast add-on collected -
                (Final Booking Total{" "}
                {formatCurrency(totalPrice + addBreakfastPrice)})
              </Checkbox>
            </Box>
          )}
        </>
      )}

      {!isPaid && (
        <Box>
          <Checkbox
            id="confirm"
            checked={confirmPaid}
            onChange={() => {
              setConfirmPaid((confirm) => !confirm);
              addBreakfast && setBreakfastPaid(true);
            }}
            disabled={isCheckingIn}
          >
            I confirm guest {guests.fullName} has paid the total amount of
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + addBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  addBreakfastPrice
                )})  `}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={
            !confirmPaid || (addBreakfast && !breakfastPaid) || isCheckingIn
          }
        >
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
