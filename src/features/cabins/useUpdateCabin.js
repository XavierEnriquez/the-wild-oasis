import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, newCabinData }) => createUpdateCabinFn(id, newCabinData),
    onSuccess: () => {
      toast.success("Cabin succesfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCabin, isUpdating };
}
