import { useQuery } from "@tanstack/react-query";

import { getBookingFn } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingData() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingFn(bookingId),
    retry: false,
  });
  return { booking, isLoading, error };
}
