import { useQuery } from "@tanstack/react-query";

import { getCabinsFn } from "../../services/apiCabins";

export function useCabinsData() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsFn,
  });
  return { cabins, isLoading, error };
}
