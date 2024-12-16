import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast/headless";

import { updateBookingFn } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingFn(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked out.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error Checking out."),
  });

  return { checkout, isCheckingOut };
}
