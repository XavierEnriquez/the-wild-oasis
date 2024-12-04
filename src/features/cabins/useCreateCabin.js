import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // useMutation & mutate are React Query functions
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabinFn,
    onSuccess: () => {
      toast.success("New cabin succesfully added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}
