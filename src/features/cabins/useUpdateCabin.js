import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updateData, id }) => createUpdateCabinFn(updateData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateCabin };
}
