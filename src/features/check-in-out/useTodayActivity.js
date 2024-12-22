import { useQuery } from "@tanstack/react-query";

import { getStaysTodayFn } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activityData, isLoading } = useQuery({
    queryFn: getStaysTodayFn,
    queryKey: ["today-activity"],
  });

  return { activityData, isLoading };
}
