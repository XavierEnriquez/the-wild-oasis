import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingFn } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useBookingDelete() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingFn,
    onSuccess: () => {
      toast.success("Booking succesfully deleted");

      // invalidate the "cabins" cache to force an api call refresh
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
