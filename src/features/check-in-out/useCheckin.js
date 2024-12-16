import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast/headless";

import { updateBookingFn } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingFn(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked in.`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/bookings/${data.id}`);
    },

    onError: () => toast.error("Check in error. Try again."),
  });

  return { checkin, isCheckingIn };
}
