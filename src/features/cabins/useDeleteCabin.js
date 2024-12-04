import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinFn,
    onSuccess: () => {
      toast.success("Cabin succesfully deleted");

      // invalidate the "cabins" cache to force an api call refresh
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
